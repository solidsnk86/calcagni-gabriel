import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AnimatedLayout from "@/components/AnimatedLayouts";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Portfolio Gabriel Calcagni",
  description:
    "Obtenga más información sobre el talentoso desarrollador y diseñador web que está detrás de este portafolio. Descubra sus habilidades, su experiencia y su enfoque creativo en el desarrollo web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
