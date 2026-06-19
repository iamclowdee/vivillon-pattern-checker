import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/auth/AuthProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Vivillon Pattern Tracker | Pokémon GO Interactive Map & Dex",
  description: "Identify and track your Pokémon GO Vivillon patterns with our high-fidelity interactive world map, collector's checklist, and community postcard exchange hub.",
  keywords: ["Pokémon GO", "Vivillon", "Vivillon Patterns", "Postcard Exchange", "Friend Codes", "Vivillon Map", "Scatterbug"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
