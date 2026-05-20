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
  "Iceland": "Tundra"
};
