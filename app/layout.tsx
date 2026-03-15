import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrameCord",
  description: "Create beautiful, customizable Discord server widget embeds for your website.",
};


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
