import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: {
    default: "Грузинська пекарня — хачапурі, хінкалі, шашлик",
    template: "%s | Грузинська пекарня",
  },

  description:
    "Грузинська пекарня — справжня грузинська кухня: хачапурі, хінкалі, шашлик, супи та салати. Домашні рецепти, традиційний смак і тепла атмосфера.",

  applicationName: "Грузинська пекарня",
  generator: "Next.js",

  keywords: [
    "грузинська пекарня",
    "грузинська кухня",
    "хачапурі",
    "хінкалі",
    "шашлик",
    "грузинський ресторан",
    "грузинське кафе",
    "меню грузинської кухні",
    "традиційна грузинська їжа",
    "кавʼярня грузинської кухні",
  ],

  authors: [{ name: "Грузинська пекарня" }],
  creator: "Грузинська пекарня",
  publisher: "Грузинська пекарня",

  metadataBase: new URL("https://gruzynskavypichka.com"),

  alternates: {
    canonical: "/",
  },

  /* =========================
     Open Graph
  ========================= */
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://gruzynskavypichka.com",
    title: "Грузинська пекарня — справжня грузинська кухня",
    description:
      "Хачапурі, хінкалі, шашлик та інші страви традиційної грузинської кухні. Автентичні рецепти та справжній смак.",
    siteName: "Грузинська пекарня",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Грузинська пекарня — традиційна грузинська кухня",
      },
    ],
  },

  /* =========================
     Twitter
  ========================= */
  twitter: {
    card: "summary_large_image",
    title: "Грузинська пекарня — традиційна кухня",
    description:
      "Справжня грузинська кухня: хачапурі, хінкалі, шашлик та класичні страви.",
    images: ["/og-image.jpg"],
  },

  /* =========================
     Robots
  ========================= */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* =========================
     Icons
  ========================= */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
