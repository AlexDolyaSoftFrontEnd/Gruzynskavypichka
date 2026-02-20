import "./globals.css";
import { Metadata, Viewport } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://georgianbakery.com.ua";

export const metadata: Metadata = {
  title: "Кафе Хінкальня",
  description: "Затишне кафе «Хінкальня» у с. Віта-Поштова!",
  metadataBase: new URL(BASE_URL),

  icons: {
    icon: [
      { url: "/icon/favication.ico", sizes: "any" },
    ],
  },

  manifest: "/site.webmanifest",

  keywords: [
    "кафе хінкальня",
    "хінкальня",
    "хінкалі",
    "хачапурі",
    "грузинська кухня",
    "Віта-Поштова",
    "Київська область",
    "доставка їжі",
    "аутентична грузинська їжа",
    "пекарня на дровах",
    "грузинські страви",
    "замовлення їжі Віта Поштова",
    "грузинська кухня доставка",
    "хачапурі на дровах",
    "грузинські хліби",
    "аджика",
    "грузинські салати",
    "грузинські напої",
    "чача",
    "грузинське вино",
  ],

  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: BASE_URL,
    siteName: "Кафе Хінкальня",
    title: "Кафе Хінкальня",
    description: "Затишне кафе «Хінкальня» у с. Віта-Поштова. Хачапурі на дровах, хінкалі.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Кафе Хінкальня - хачапурі та хінкалі",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@khinkalnya",
    creator: "@khinkalnya",
    title: "Кафе Хінкальня",
    description: "Затишне кафе «Хінкальня» у с. Віта-Поштова. Хачапурі на дровах, хінкалі.",
    images: ["/twitter-image.jpg"],
  },

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  authors: [{ name: "Кафе Хінкальня Віта-Поштова" }],
  creator: "Кафе Хінкальня Віта-Поштова",
  category: "food",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#c89b3c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <meta name="language" content="Ukrainian" />
        <meta name="geo.country" content="UA" />
        <meta name="geo.region" content="UA-32" />
        <meta name="geo.placename" content="Віта-Поштова, Київська область" />
        <meta name="rating" content="general" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      </head>
      <body>{children}</body>
    </html>
  );
}
