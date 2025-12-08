import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G Shreyas Shetty | Portfolio",
  description:
    "Portfolio of G Shreyas Shetty – Computer Science & Data Science enthusiast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
