import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "../../../lib/supabaseClient";

export interface Trainer {
  id: string;
  name: string;
  friend_code: string;
  region: string;
  note: string;
  created_at: string;
}

// Pre-populated in-memory server database of active global trainers
let inMemoryTrainers: Trainer[] = [
  {
    id: "mock-1",
    name: "Hiroto",
    friend_code: "4820 9381 0492",
    region: "Elegant",
    note: "Active daily player from Kyoto, Japan. Sending gifts every day!",
    created_at: new Date(Date.now() - 4 * 3600000).toISOString()
  },
  {
    id: "mock-2",
    name: "Amit",
    friend_code: "9382 7410 8593",
    region: "Monsoon",
    note: "Looking for Tundra and Polar postcards! Sending Monsoon from Mumbai.",
    created_at: new Date(Date.now() - 12 * 3600000).toISOString()
  },
  {
    id: "mock-3",
    name: "Giovanna",
    friend_code: "5829 1049 3820",
    region: "Savanna",
    note: "Brazil trainer, searching for Elegant postcards to complete my set.",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString()
  },
  {
    id: "mock-3b",
    name: "Kai",
    friend_code: "8391 0492 8401",
    region: "Ocean",
    note: "Alola! Sending daily Ocean postcards from Honolulu, Hawaii. looking for Sandstorm!",
    created_at: new Date(Date.now() - 30 * 3600000).toISOString()
  },
  {
    id: "mock-4",
    name: "Sven",
    friend_code: "2048 9381 0582",
    region: "Tundra",
    note: "Located in Northern Norway. High-frequency gifter, looking for Savanna.",
    created_at: new Date(Date.now() - 36 * 3600000).toISOString()
  },
  {
    id: "mock-4b",
    name: "Liam",
    friend_code: "6029 4810 3928",
    region: "River",
    note: "Daily gifts from Sydney, Australia! Let's get to Best Friends level.",
    created_at: new Date(Date.now() - 42 * 3600000).toISOString()
  },
  {
    id: "mock-5",
    name: "Emma",
    friend_code: "7401 8592 0481",
    region: "Garden",
    note: "London, UK player. Let's exchange postcards for Scatterbugs!",
    created_at: new Date(Date.now() - 48 * 3600000).toISOString()
  },
  {
    id: "mock-5b",
    name: "Siti",
    friend_code: "1928 3847 5620",
    region: "Jungle",
    note: "Singapore player! Sending Jungle gifts daily.",
    created_at: new Date(Date.now() - 60 * 3600000).toISOString()
  },
  {
    id: "mock-6",
    name: "Brandon",
    friend_code: "3920 4810 5928",
    region: "Modern",
    note: "Gifts daily from Chicago, Illinois. Let's hit Best Friends level!",
    created_at: new Date(Date.now() - 72 * 3600000).toISOString()
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from("trainers").select("*").order("created_at", { ascending: false });
      
      if (region && region !== "All") {
        query = query.eq("region", region);
      }
      
      const { data, error } = await query;
      if (!error && data) {
        return NextResponse.json({ trainers: data, isMock: false });
      }
      console.warn("Supabase query failed, falling back to mock memory database:", error);
    }

    // Fallback: Return in-memory database
    let filtered = [...inMemoryTrainers];
    if (region && region !== "All") {
      filtered = filtered.filter(t => t.region.toLowerCase() === region.toLowerCase());
    }
    
    // Sort in-memory by newest first
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ trainers: filtered, isMock: true });
  } catch (error) {
    console.error("GET trainers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, friend_code, region, note } = body;

    // Validation
    if (!name || !friend_code || !region) {
      return NextResponse.json({ error: "Name, Friend Code, and Region are required fields." }, { status: 400 });
    }

    // Standardize Friend Code format (remove spaces/dashes, verify 12 digits)
    const cleanCode = friend_code.replace(/[\s-]/g, "");
    if (!/^\d{12}$/.test(cleanCode)) {
      return NextResponse.json({ error: "Friend Code must be a valid 12-digit number (e.g. 1234 5678 9012)." }, { status: 400 });
    }

    // Re-format Friend Code to 'xxxx xxxx xxxx'
    const formattedCode = `${cleanCode.substring(0, 4)} ${cleanCode.substring(4, 8)} ${cleanCode.substring(8, 12)}`;

    const newTrainer = {
      name: name.trim().substring(0, 20), // Max 20 chars
      friend_code: formattedCode,
      region,
      note: note ? note.trim().substring(0, 100) : "Postcard exchange partner!", // Max 100 chars
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("trainers")
        .insert([newTrainer])
        .select();

      if (!error && data && data[0]) {
        return NextResponse.json({ trainer: data[0], isMock: false });
      }
      console.warn("Supabase insert failed, falling back to mock memory database:", error);
    }

    // Fallback: Save in-memory
    const inMemoryEntry: Trainer = {
      id: `mock-${Date.now()}`,
      ...newTrainer
    };
    
    // Check if code is already registered in-memory to prevent spam
    const exists = inMemoryTrainers.some(t => t.friend_code === formattedCode);
    if (exists) {
      return NextResponse.json({ error: "This Friend Code is already active in the directory!" }, { status: 400 });
    }

    inMemoryTrainers.unshift(inMemoryEntry);
    return NextResponse.json({ trainer: inMemoryEntry, isMock: true });
  } catch (error) {
    console.error("POST trainer error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
