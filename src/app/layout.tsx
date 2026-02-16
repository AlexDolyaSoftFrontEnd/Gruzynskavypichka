import "./globals.css";
import { Metadata, Viewport } from "next";

// Базовый URL для изображений и канонических ссылок
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://georgianbakery.com.ua";

export const metadata: Metadata = {
  // Основные метаданные
  title: {
    default: "Хінкальня | Хачапурі, Хінкалі у Віта-Поштова",
    template: "%s | Хінкальня",
  },
  description:
    "Затишна Хінкальня у с. Віта-Поштова! Справжні хачапурі на дровах, сочні хінкалі. Доставка по Києву та області за 60 хвилин.",
  
  // Базовый URL для изображений Open Graph и канонических ссылок
  metadataBase: new URL(BASE_URL),
  
  // Ключевые слова
  keywords: [
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
    "заказ їжі Віта Поштова",
    "грузинська кухня доставка",
    "хачапурі на дровах",
    "грузинські хліби",
    "аджика",
    "грузинські салати",
    "грузинські напої",
    "чача",
    "грузинське вино",
  ],

  // Open Graph (для соцсетей)
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: BASE_URL,
    siteName: "Хінкальня Віта-Поштова",
    title: "Хінкальня | Аутентичні Хачапурі та Хінкалі",
    description:
      "Затишна Хінкальня у с. Віта-Поштова. Хачапурі на дровах, хінкалі. Доставка по Києву та області.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Хінкальня - хачапурі та хінкалі",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@khinkalnya",
    creator: "@khinkalnya",
    title: "Хінкальня | Аутентичні Хачапурі та Хінкалі",
    description:
      "Затишна Хінкальня у с. Віта-Поштова. Хачапурі на дровах, хінкалі. Доставка по Києву та області.",
    images: ["/twitter-image.jpg"],
  },

  // Каноническая ссылка
  alternates: {
    canonical: BASE_URL,
  },

  // Robots.txt
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

  // Контактная информация
  authors: [{ name: "Хінкальня Віта-Поштова" }],
  creator: "Хінкальня Віта-Поштова",

  // Категория
  category: "food",
};

// Отдельный экспорт для viewport и themeColor
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
        {/* Дополнительные метатеги для SEO */}
        <meta name="author" content="Alex Dolya" />
        <meta name="language" content="Ukrainian" />
        <meta name="geo.country" content="UA" />
        <meta name="geo.region" content="UA-32" />
        <meta name="geo.placename" content="Віта-Поштова, Київська область" />
        <meta name="rating" content="general" />
        
        {/* Метатеги для верификации */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      </head>
      <body>{children}</body>
    </html>
  );
}