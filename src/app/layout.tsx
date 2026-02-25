import "./globals.css";
import { Metadata, Viewport } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://georgianbakery.com.ua";
const SITE_NAME = "Кафе Хінкальня";
const SITE_TAGLINE = "Грузинська кухня";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: "Грузинська кухня: хачапурі на дровах, хінкалі, сациві, харчо та інші традиційні страви. Доставка по Віті-Поштовій та околицях.",
  metadataBase: new URL(BASE_URL),
  manifest: "/site.webmanifest",

  icons: {
    icon: { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    shortcut: { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#c89b3c" },
    ],
  },

  keywords: [
    "кафе хінкальня",
    "хінкальня",
    "хінкалі",
    "хачапурі",
    "грузинська кухня",
    "грузинські страви",
    "доставка їжі",
    "аутентична грузинська їжа",
    "пекарня на дровах",
    "грузинська кухня доставка",
    "хачапурі на дровах",
    "грузинські хліби",
    "аджика",
    "грузинські салати",
    "грузинські напої",
    "грузинське вино",
    "сациві",
    "харчо",
    "чахохбілі",
    "бадріджані",
    "аджапсандалі",
    "лобіо",
    "сулугуні",
    "ресторан грузинської кухні",
    "кафе з доставкою",
  ],

  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "Автентична грузинська кухня: хачапурі на дровах, хінкалі, сациві, харчо. Доставка по Віті-Поштовій та околицях.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — хачапурі та хінкалі на дровах`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@khinkalnya",
    creator: "@khinkalnya",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "Автентична грузинська кухня: хачапурі на дровах, хінкалі. Доставка по Віті-Поштовій.",
    images: [
      {
        url: "/twitter-image.jpg",
        width: 1200,
        height: 600,
        alt: `${SITE_NAME} — грузинська кухня`,
      },
    ],
  },

  other: {
    "fb:app_id": process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
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

  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "restaurant",
  applicationName: SITE_NAME,

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
    other: {
      "facebook-domain-verification": process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || "",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#140a06" },
    { color: "#c89b3c" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE_NAME,
    description: "Автентична грузинська кухня: хачапурі на дровах, хінкалі, сациві, харчо та інші традиційні страви.",
    url: BASE_URL,
    telephone: "+380935450594",
    email: "info@georgianbakery.com.ua",
    priceRange: "₴₴",
    servesCuisine: "Georgian",
    image: [
      `${BASE_URL}/og-image.jpg`,
      `${BASE_URL}/twitter-image.jpg`,
    ],
    sameAs: [
      "https://www.facebook.com/khinkalnya",
      "https://www.instagram.com/khinkalnya",
      "https://t.me/khinkalnya",
    ],
    menu: `${BASE_URL}/menu`,
    acceptsReservations: "True",
    paymentAccepted: "Cash, Card, Apple Pay, Google Pay",
    hasMenu: `${BASE_URL}/menu`,
  };

  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <meta name="language" content="uk" />
        <meta name="geo.country" content="UA" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}