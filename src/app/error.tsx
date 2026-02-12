"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Игнорируем ошибку инструментов разработки
    if (error.digest === "NEXT_DEVTOOLS_SIMULATED_ERROR") {
      return;
    }
    console.error("Global error:", error);
  }, [error]);

  // Обработчик перехода на главную
  const handleGoHome = () => {
    reset();
    window.location.href = "/";
  };

  // Игнорируем ошибку инструментов разработки
  if (error.digest === "NEXT_DEVTOOLS_SIMULATED_ERROR") {
    return null;
  }

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "linear-gradient(180deg, #140a06 0%, #080403 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 600,
          padding: "40px 20px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>
          Щось пішло не так
        </h1>

        <p style={{ opacity: 0.8, marginBottom: 30 }}>
          Сталася технічна помилка на сайті Грузинської Пекарні.
        </p>

        <button
          onClick={handleGoHome}
          style={{
            padding: "12px 28px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#c19a6b",
            color: "#000",
            fontWeight: 600,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          На головну сторінку
        </button>
      </div>
    </div>
  );
}
