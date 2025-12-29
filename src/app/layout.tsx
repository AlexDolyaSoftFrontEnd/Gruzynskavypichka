import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: {
    default: "MOLFAR — інститут розвідки",
    template: "%s | MOLFAR Intelligence Institute",
  },

  description:
    "MOLFAR Intelligence Institute — аналітика, дослідження, довіра, партнерства та авторські матеріали.",

  applicationName: "MOLFAR Intelligence Institute",
  generator: "Next.js",

  keywords: [
    "MOLFAR",
    "інтелектуальна аналітика",
    "розвідка",
    "дослідження",
    "аналітика",
    "інститут",
    "стратегія",
  ],

  authors: [{ name: "MOLFAR Intelligence Institute" }],
  creator: "MOLFAR Intelligence Institute",
  publisher: "MOLFAR Intelligence Institute",

  metadataBase: new URL("https://molfar.ai"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://molfar.ai",
    title: "MOLFAR Intelligence Institute",
    description:
      "Аналітика, дослідження та інтелектуальні рішення.",
    siteName: "MOLFAR Intelligence Institute",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MOLFAR Intelligence Institute",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MOLFAR Intelligence Institute",
    description:
      "Аналітика, дослідження та інтелектуальні рішення.",
    images: ["/og-image.jpg"],
  },

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
