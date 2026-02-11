"use client";

import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./OrderModal.css";

/* =========================
   Interfaces
========================= */

export interface OrderFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FieldBlockProps {
  name: keyof OrderFormValues;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  as?: "input" | "textarea";
}

/* =========================
   Initial values
========================= */

const initialValues: OrderFormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  comment: "",
};

/* =========================
   Validation
========================= */

const schema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(50, "Максимум 50 символів")
    .required("Обовʼязково"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Формат: +380XXXXXXXXX")
    .required("Обовʼязково"),
  email: Yup.string()
    .email("Некоректний email")
    .required("Обовʼязково"),
  address: Yup.string()
    .min(10, "Будь ласка, вкажіть повну адресу з містом")
    .required("Обовʼязково"),
  comment: Yup.string().max(500, "Максимум 500 символів"),
});

/* =========================
   Component
========================= */

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="order-modal order-modal--open">
      {/* Backdrop */}
      <button
        type="button"
        className="order-modal__backdrop"
        onClick={onClose}
        aria-label="Закрити модальне вікно"
      />

      {/* Dialog */}
      <aside
        className="order-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <header className="order-modal__header">
          <h2
            id="order-modal-title"
            className="order-modal__title"
          >
            Замовлення
          </h2>
          <div className="order-modal__subtitle">
            Смачні хачапурі та традиційні страви прямо до вашого столу
          </div>

          <button
            type="button"
            className="order-modal__close"
            onClick={onClose}
            aria-label="Закрити"
          >
            ×
          </button>
        </header>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, helpers) => {
            try {
              const response = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...values,
                  cuisine: "georgian",
                  timestamp: new Date().toISOString()
                }),
              });

              if (!response.ok) {
                throw new Error("Помилка при відправці");
              }

              helpers.resetForm();
              onClose();
              alert("Ваше замовлення грузинської випічки прийнято! Очікуйте дзвінка для підтвердження.");
            } catch (err) {
              console.error(err);
              alert("Помилка при відправці замовлення. Будь ласка, спробуйте ще раз.");
            }
          }}
        >
          {({ isValid, isSubmitting, errors, touched }) => (
            <Form className="order-form" noValidate>
              <fieldset className="order-form__fields">
                <legend className="visually-hidden">
                  Контактні дані для замовлення випічки
                </legend>

                <FieldBlock 
                  name="name" 
                  label="Ваше ім'я" 
                  placeholder="Ніно, Гіоргі, Маріам або ваше ім'я" 
                  autoComplete="name" 
                />
                <FieldBlock
                  name="phone"
                  label="Телефон"
                  placeholder="+380 XX XXX XX XX"
                  autoComplete="tel"
                />
                <FieldBlock
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="vasha.pochta@email.com"
                  autoComplete="email"
                />
                <FieldBlock
                  name="address"
                  label="Адреса доставки"
                  placeholder="м. Київ, вул. Хрещатик, 15, під'їзд 2, кв. 42"
                  autoComplete="street-address"
                />
                <FieldBlock
                  name="comment"
                  label="Бажання до замовлення"
                  placeholder="Наприклад: гаряче хачапурі, додатково сир сулугуні, без часнику, зелень окремо..."
                  as="textarea"
                />
              </fieldset>

              <div className="order-form__info">
                <p>Доставка: 45-60 хвилин</p>
              </div>

              <footer className="order-form__actions">
                <button
                  type="submit"
                  className="order-form__submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Готуємо ваше замовлення..." : "Замовити хачапурі"}
                </button>
              </footer>
            </Form>
          )}
        </Formik>
      </aside>
    </div>
  );
}

/* =========================
   Field block
========================= */

function FieldBlock({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  as = "input",
}: FieldBlockProps) {
  return (
    <div className="order-form__field">
      <label
        htmlFor={name}
        className="order-form__label"
      >
        {label}
      </label>

      <Field
        id={name}
        name={name}
        as={as}
        type={as === "input" ? type : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="order-form__input"
      />
      
      <div className="order-form__error">
        <Field
          name={name}
          render={({ form }: any) => 
            form.touched[name] && form.errors[name] 
              ? <div className="order-form__error-text">{form.errors[name]}</div> 
              : null
          }
        />
      </div>
    </div>
  );
}