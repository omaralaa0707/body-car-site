import type { Metadata } from "next";
import { Libre_Franklin, Source_Sans_3, Amiri_Quran, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-libre-franklin",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
});
// Cairo Play (tried first) turned out to be a COLR/CPAL colour font: its
// dots and hamzas ignore the CSS `color` property and render in a fixed
// palette regardless of theme -- caught only by screenshotting real Arabic
// copy, the same class of bug as Reem Kufi Ink elsewhere in this series.
const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri-quran",
});
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-arabic",
});

export const metadata: Metadata = {
  title: "Body Car — a number they never wrote down | El Basatin, Cairo",
  description:
    "A concept site built from Body Car's own published financing plans: six two-option instalment pairs, across five cars, that all solve to the same unstated 42-month loan term.",
  metadataBase: new URL("https://body-car-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Body Car — a number they never wrote down",
    description:
      "Every financing plan they publish quotes two options. Solved against each other, all six resolve to the same 42-month term — a number printed nowhere.",
    locale: "en_US",
    type: "website",
  },
  other: { "theme-color": "#0d0c0a" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      translate="no"
      className={`notranslate ${libreFranklin.variable} ${sourceSans.variable} ${amiriQuran.variable} ${ibmPlexSansArabic.variable}`}
    >
      <body className="bg-ground text-cream antialiased">
        <noscript>
          <style>{`[data-balance-item]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="en">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
