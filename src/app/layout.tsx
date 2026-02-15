import "./globals.css";
import { Metadata, Viewport } from "next";

// Базовый URL для изображений и канонических ссылок
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://georgianbakery.com.ua";

export const metadata: Metadata = {
  // Основные метаданные
  title: {
    default: "Грузинська Пекарня Віта-Поштова | Хачапурі, Хінкалі, Лобіо",
    template: "%s | Грузинська Пекарня",
  },
  description:
    "Справжня грузинська пекарня у с. Віта-Поштова (Київська область)! Хачапурі на дровах, сочні хінкалі, лобіо з садовими травами. Доставка по Києву та області за 60 хвилин.",
  
  // Базовый URL для изображений Open Graph и канонических ссылок
  metadataBase: new URL(BASE_URL),
  
  // Ключевые слова
  keywords: [
    "грузинська пекарня",
    "хачапурі",
    "хінкалі",
    "лобіо",
    "грузинська кухня",
    "Віта-Поштова",
    "Київська область",
    "доставка їжі",
    "аутентична грузинська їжа",
    "пекарня на дровах",
    "грузинські страви",
    "заказ їжі  Віта Поштова",
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
    siteName: "Грузинська Пекарня Віта-Поштова",
    title: "Грузинська Пекарня | Аутентичні Хачапурі та Хінкалі",
    description:
      "Справжня грузинська пекарня у с. Віта-Поштова. Хачапурі на дровах, хінкалі, лобіо. Доставка по Києву та області.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Грузинська пекарня - хачапурі та хінкалі",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@georgianbakery",
    creator: "@georgianbakery",
    title: "Грузинська Пекарня | Аутентичні Хачапурі та Хінкалі",
    description:
      "Справжня грузинська пекарня у с. Віта-Поштова. Хачапурі на дровах, хінкалі, лобіо. Доставка по Києву та області.",
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
  authors: [{ name: "Грузинська Пекарня Віта-Поштова" }],
  creator: "Грузинська Пекарня Віта-Поштова",

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
        <meta name="author" content="Грузинська Пекарня Віта-Поштова" />
        <meta name="language" content="Ukrainian" />
        <meta name="geo.country" content="UA" />
        <meta name="geo.region" content="UA-32" />
        <meta name="geo.placename" content="Віта-Поштова, Київська область" />
        <meta name="rating" content="general" />
        
        {/* Метатеги для верификации */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
      </head>
      <body>{children}</body>
    </html>
  );
}
