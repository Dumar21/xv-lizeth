import type { Metadata, Viewport } from "next";
import { Pinyon_Script, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const script = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon" });
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const sans = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Mis XV Años · Lizeth Jhoana",
  description: "Estás invitado a celebrar mis XV años",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Mis XV Años · Lizeth Jhoana",
    description: "Estás invitado a celebrar mis XV años",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  themeColor: "#160536",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${script.variable} ${serif.variable} ${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}