import { NextResponse } from "next/server";

const themes = [
  { id: "neon", name: "Neon", accent: "#a855f7" },
  { id: "minimal", name: "Minimal", accent: "#718096" },
  { id: "animated", name: "Animated", accent: "#8b5cf6" },
  { id: "glass", name: "Glass", accent: "#06b6d4" },
  { id: "terminal", name: "Terminal", accent: "#22c55e" },
  { id: "cyberpunk", name: "Cyber", accent: "#00f0ff" },
  { id: "ocean", name: "Ocean", accent: "#0284c7" },
  { id: "forest", name: "Forest", accent: "#16a34a" },
  { id: "sunset", name: "Sunset", accent: "#ea580c" },
  { id: "retro", name: "Retro", accent: "#f59e0b" },
  { id: "gradient", name: "Gradient", accent: "#ec4899" },
  { id: "nature", name: "Nature", accent: "#22c55e" },
  { id: "elegant", name: "Elegant", accent: "#1f2937" },
  { id: "candy", name: "Candy", accent: "#f472b6" },
  { id: "midnight", name: "Midnight", accent: "#6366f1" },
  { id: "frost", name: "Frost", accent: "#38bdf8" },
  { id: "galaxy", name: "Galaxy", accent: "#8b5cf6" },
  { id: "aurora", name: "Aurora", accent: "#10b981" },
];

export async function GET() {
  return NextResponse.json({
    themes,
    total: themes.length,
  });
}
