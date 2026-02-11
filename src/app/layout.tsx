import "./globals.css";
import { Metadata } from "next";

// SEO Metadata для грузинской кухни
export const metadata: Metadata = {
  title: {
    default: "Грузинська кухня | Хачапурі, Хінкалі, Лобіо - Найкращі страви Грузії",
    template: "%s | Грузинська кухня",
  },
  description: "Справжня грузинська кухня у Києві. Замовляйте хачапурі, хінкалі, лобіо, бадріджані, чвіштарі та інші аутентичні страви Грузії з доставкою на дом.",
  keywords: [
    "грузинська кухня",
    "хачапурі",
    "хінкалі",
    "лобіо",
    "бадріджані",
    "чвіштарі",
    "грузинські страви",
    "доставка грузинської їжі",
    "грузинський ресторан",
    "грузинська їжа Київ",
    "сулугуні",
    "аджика",
    "грузинські закуски",
    "грузинські салати",
    "грузинські напої",
    "чурчхела",
    "грузинське вино",
    "грузинська піца",
    "грузинські хлібці",
    "грузинська кухня онлайн",
  ],
  authors: [{ name: "Грузинська кухня" }],
  creator: "Грузинська кухня",
  publisher: "Грузинська кухня",
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
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://ваш-сайт.com",
    siteName: "Грузинська кухня",
    title: "Грузинська кухня | Хачапурі, Хінкалі, Лобіо",
    description: "Справжня грузинська кухня у Києві. Аутентичні страви Грузії з доставкою на дом.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Грузинська кухня - хачапурі та хінкалі",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Грузинська кухня | Хачапурі, Хінкалі, Лобіо",
    description: "Справжня грузинська кухня у Києві. Аутентичні страви Грузії з доставкою на дом.",
    images: ["/twitter-image.jpg"],
    creator: "@gruzinskaya_kuhnja",
  },
  alternates: {
    canonical: "https://ваш-сайт.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "ваш-google-verification-code",
    yandex: "ваш-yandex-verification-code",
  },
};

// JSON-LD Schema.org разметка для грузинского ресторана
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://ваш-сайт.com/#restaurant",
      "name": "Грузинська кухня",
      "url": "https://ваш-сайт.com",
      "image": "https://ваш-сайт.com/logo.png",
      "description": "Справжня грузинська кухня у Києві. Замовляйте хачапурі, хінкалі, лобіо, бадріджані та інші аутентичні страви Грузії з доставкою на дом.",
      "priceRange": "$$",
      "servesCuisine": ["Грузинська", "Кавказька"],
      "areaServed": "UA",
      "telephone": "+380XXXXXXXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "вул. Грузинська, 1",
        "addressLocality": "Київ",
        "postalCode": "01001",
        "addressCountry": "UA",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 50.4501,
        "longitude": 30.5234,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "10:00",
          "closes": "22:00",
        },
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "500",
      },
      "potentialAction": {
        "@type": "OrderAction",
        "target": "https://ваш-сайт.com/menu",
        "deliveryMethod": [
          "http://purl.org/goodrelations/v1#DeliveryModePickUp",
          "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ваш-сайт.com/#website",
      "url": "https://ваш-сайт.com",
      "name": "Грузинська кухня",
      "description": "Справжня грузинська кухня у Києві",
      "publisher": {
        "@id": "https://ваш-сайт.com/#restaurant",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ваш-сайт.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ваш-сайт.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Головна",
          "item": "https://ваш-сайт.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Меню",
          "item": "https://ваш-сайт.com/menu",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Доставка",
          "item": "https://ваш-сайт.com/delivery",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" prefix="og: https://ogp.me/ns#">
      <head>
        {/* Charset и Viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Основные мета-теги */}
        <meta name="description" content="Справжня грузинська кухня у Києві. Замовляйте хачапурі, хінкалі, лобіо, бадріджані, чвіштарі та інші аутентичні страви Грузії з доставкою на дом." />
        <meta name="keywords" content="грузинська кухня, хачапурі, хінкалі, лобіо, бадріджані, чвіштарі, грузинські страви, доставка грузинської їжі, грузинський ресторан, грузинська їжа Київ" />
        <meta name="author" content="Грузинська кухня" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:url" content="https://ваш-сайт.com" />
        <meta property="og:site_name" content="Грузинська кухня" />
        <meta property="og:title" content="Грузинська кухня | Хачапурі, Хінкалі, Лобіо" />
        <meta property="og:description" content="Справжня грузинська кухня у Києві. Аутентичні страви Грузії з доставкою на дом." />
        <meta property="og:image" content="https://ваш-сайт.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Грузинська кухня - хачапурі та хінкалі" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Грузинська кухня | Хачапурі, Хінкалі, Лобіо" />
        <meta name="twitter:description" content="Справжня грузинська кухня у Києві. Аутентичні страви Грузії з доставкою на дом." />
        <meta name="twitter:image" content="https://ваш-сайт.com/twitter-image.jpg" />
        <meta name="twitter:creator" content="@gruzinskaya_kuhnja" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ваш-сайт.com" />
        
        {/* Фавиконки */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Yandex Verification */}
        <meta name="yandex-verification" content="ваш-yandex-verification-code" />
        
        {/* Google Verification */}
        <meta name="google-site-verification" content="ваш-google-verification-code" />
      </head>
      <body>{children}</body>
    </html>
  );
}
