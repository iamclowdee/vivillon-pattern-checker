export interface VivillonPattern {
  name: string;
  image: string;
  description: string;
  primaryColor: string; // Hex color for neon glows
  countries: string[];
}

export const VIVILLON_PATTERNS: Record<string, VivillonPattern> = {
  Monsoon: {
    name: "Monsoon",
    image: "/patterns/monsoon.jpg",
    description: "Features a beautiful dark gray wing pattern with yellow and blue accents, representing heavy rains and humid tropical climates.",
    primaryColor: "#5B7592",
    countries: ["India", "Bangladesh", "Myanmar", "Thailand", "Vietnam", "Taiwan"]
  },
  Elegant: {
    name: "Elegant",
    image: "/patterns/elegant.jpg",
    description: "Showcases a deep violet wing color with white patterns, radiating a refined and graceful presence.",
    primaryColor: "#A368B5",
    countries: ["Japan", "Okinawa"]
  },
  Modern: {
    name: "Modern",
    image: "/patterns/modern.jpg",
    description: "Features red and blue patterns set against a grey grid, embodying the steel-and-glass structural motifs of metropolitan cities.",
    primaryColor: "#D65A5A",
    countries: ["United States", "Canada (East)", "Mexico (North)"]
  },
  Meadow: {
    name: "Meadow",
    image: "/patterns/meadow.jpg",
    description: "Decorated with rich pink tones and green outlines, evoking a sense of lush flower-filled plains in spring.",
    primaryColor: "#E085A7",
    countries: ["France", "Italy", "Switzerland", "Austria"]
  },
  Savanna: {
    name: "Savanna",
    image: "/patterns/savanna.png",
    description: "Represented by amber yellow and striped green patterns, reminiscent of dry grasslands and wild scrublands.",
    primaryColor: "#CCA03A",
    countries: ["Brazil", "Argentina", "Uruguay", "Paraguay"]
  },
  Polar: {
    name: "Polar",
    image: "/patterns/polar.png",
    description: "Adorned with frozen ice-blue and white gradients, symbolizing the chilling beauty of frozen tundra and subpolar zones.",
    primaryColor: "#6EC3E6",
    countries: ["Canada", "Alaska", "Norway (South)", "Sweden", "Finland"]
  },
  Garden: {
    name: "Garden",
    image: "/patterns/garden.png",
    description: "Blends deep forest greens and bright leaves, perfectly blending into the woodlands and gardens of the British Isles.",
    primaryColor: "#4E8D62",
    countries: ["United Kingdom", "Ireland", "New Zealand"]
  },
  Continental: {
    name: "Continental",
    image: "/patterns/continental.png",
    description: "Has bright yellow and amber borders, representing the expansive temperate forests and heartlands of mainland Europe.",
    primaryColor: "#E5C158",
    countries: ["Germany", "Poland", "Denmark", "Czechia", "Hungary", "Romania"]
  },
  Marine: {
    name: "Marine",
    image: "/patterns/marine.png",
    description: "A dark blue design with orange highlights, reflecting ocean waves crashing against coastal rocks.",
    primaryColor: "#3A72C4",
    countries: ["Spain", "Portugal", "Greece", "Italy (South)", "Chile"]
  },
  Tundra: {
    name: "Tundra",
    image: "/patterns/tundra.png",
    description: "A gorgeous light teal and grey design, reflecting the frozen mountains and glacial plains of the far north.",
    primaryColor: "#73D4D6",
    countries: ["Norway", "Iceland", "Siberia", "Sweden (North)"]
  },
  Archipelago: {
    name: "Archipelago",
    image: "/patterns/archipelago.png",
    description: "Features a striking pattern of warm orange and yellow geometric spots, reminiscent of volcanic island archipelagos and tropical reefs.",
    primaryColor: "#E2583E",
    countries: ["Caribbean", "Puerto Rico", "Bahamas", "Florida (South)", "Jamaica"]
  },
  "High Plains": {
    name: "High Plains",
    image: "/patterns/high_plains.png",
    description: "Boasts a dusty golden-brown color gradient, mimicking the arid plains, canyons, and high plateau deserts of western North America.",
    primaryColor: "#C2A649",
    countries: ["United States (West)", "Canada (West)", "Mexico (Northwest)"]
  },
  "Icy Snow": {
    name: "Icy Snow",
    image: "/patterns/icy_snow.png",
    description: "A clean, snow-white pattern with light-blue accents, reflecting the pristine white landscape of glaciers and perpetual polar snow.",
    primaryColor: "#EAEFF8",
    countries: ["Greenland", "Northern Canada", "Norway (North)", "Siberia (North)"]
  },
  Jungle: {
    name: "Jungle",
    image: "/patterns/jungle.png",
    description: "Features a rich dark green camouflage motif, blending seamlessly into the tropical rainforests and canopy systems of the equatorial belt.",
    primaryColor: "#2C5E3B",
    countries: ["Colombia", "Costa Rica", "Panama", "Singapore", "Malaysia", "Indonesia"]
  },
  Ocean: {
    name: "Ocean",
    image: "/patterns/ocean.png",
    description: "Showcases a vibrant sunset-like gradient of orange and warm red with yellow highlights, echoing the sun setting over wide ocean waters.",
    primaryColor: "#E08031",
    countries: ["Hawaii", "Galapagos", "Madagascar (South)", "Reunion"]
  },
  River: {
    name: "River",
    image: "/patterns/river.png",
    description: "Features a blend of muddy brown, tan, and light blue ripple accents, inspired by massive river deltas flowing through inland heartlands.",
    primaryColor: "#8D98A7",
    countries: ["Australia", "South Africa", "Botswana", "Namibia"]
  },
  Sandstorm: {
    name: "Sandstorm",
    image: "/patterns/sandstorm.png",
    description: "Characterized by soft sand-dune tan and beige tones, representing the harsh desert sandstorms that blow across the Middle East.",
    primaryColor: "#D4B26F",
    countries: ["Turkey", "Egypt", "Saudi Arabia", "United Arab Emirates", "Israel", "Jordan"]
  },
  Sun: {
    name: "Sun",
    image: "/patterns/sun.png",
    description: "Adorned with bright reddish-orange wings and a bright yellow center, radiating the warmth and power of the blazing sun.",
    primaryColor: "#F05030",
    countries: ["Mexico", "Guatemala", "Honduras", "Madagascar (North)"]
  }
};

export const COUNTRY_MAPPINGS: Record<string, string> = {
  "India": "Monsoon",
  "Bangladesh": "Monsoon",
  "Myanmar": "Monsoon",
  "Thailand": "Monsoon",
  "Vietnam": "Monsoon",
  "Taiwan": "Monsoon",
  "Japan": "Elegant",
  "United States": "Modern",
  "France": "Meadow",
  "Italy": "Meadow",
  "Switzerland": "Meadow",
  "Austria": "Meadow",
  "Brazil": "Savanna",
  "Argentina": "Savanna",
  "Uruguay": "Savanna",
  "Paraguay": "Savanna",
  "Canada": "Polar",
  "Sweden": "Polar",
  "Finland": "Polar",
  "United Kingdom": "Garden",
  "Ireland": "Garden",
  "New Zealand": "Garden",
  "Germany": "Continental",
  "Poland": "Continental",
  "Denmark": "Continental",
  "Czechia": "Continental",
  "Hungary": "Continental",
  "Romania": "Continental",
  "Spain": "Marine",
  "Portugal": "Marine",
  "Greece": "Marine",
  "Chile": "Marine",
  "Norway": "Tundra",
  "Iceland": "Tundra",
  "Puerto Rico": "Archipelago",
  "Bahamas": "Archipelago",
  "Jamaica": "Archipelago",
  "Colombia": "Jungle",
  "Costa Rica": "Jungle",
  "Panama": "Jungle",
  "Singapore": "Jungle",
  "Malaysia": "Jungle",
  "Indonesia": "Jungle",
  "Hawaii": "Ocean",
  "Galapagos": "Ocean",
  "Reunion": "Ocean",
  "Australia": "River",
  "South Africa": "River",
  "Botswana": "River",
  "Namibia": "River",
  "Turkey": "Sandstorm",
  "Egypt": "Sandstorm",
  "Saudi Arabia": "Sandstorm",
  "United Arab Emirates": "Sandstorm",
  "Israel": "Sandstorm",
  "Jordan": "Sandstorm",
  "Mexico": "Sun",
  "Guatemala": "Sun",
  "Honduras": "Sun",
  "Greenland": "Icy Snow"
};
