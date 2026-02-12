import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Грузинська Пекарня Віта-Поштова | Хачапурі, Хінкалі, Лобіо",
    template: "%s | Грузинська Пекарня",
  },
  description:
    "Справжня грузинська пекарня у с. Віта-Поштова (Київська область)! Аутентичні хачапурі на дровах, сочні хінкалі, лобіо з садовими травами. Доставка по Києву та області за 60 хвилин.",
  alternates: {
    canonical: "https://ваш-сайт.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
