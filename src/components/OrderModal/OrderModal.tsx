"use client";

import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./OrderModal.css";

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

const initialValues: OrderFormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  comment: "",
};

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
      <button
        type="button"
        className="order-modal__backdrop"
        onClick={onClose}
        aria-label="Закрити модальне вікно"
      />

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
                  Контактні дані для замовлення
                </legend>

                <FieldBlock 
                  name="name" 
                  label="Ваше ім'я" 
                  placeholder="Ніно, Гіоргі, Маріам або ваше ім'я" 
                  autoComplete="name" 
                />
                <FieldBlock
                  name="phone"
                  label="Номер телефону"
                  placeholder="+380 XX XXX XX XX"
                  autoComplete="tel"
                />
                <FieldBlock
                  name="address"
                  label="Куди доставити"
                  placeholder="Зона доставки: до 50 км від Віти-Поштової"
                  autoComplete="shipping street-address"
                />
                <FieldBlock
                  name="comment"
                  label="Побажання до замовлення"
                  placeholder="Наприклад: гаряче хачапурі, додатково сир сулугуні, без часнику, зелень окремо..."
                  as="textarea"
                />
              </fieldset>

              <div className="order-form__info">
                <p>Ваш смак Грузії — вже за <strong>40–60 хвилин</strong>!</p>
              </div> 

              <footer className="order-form__actions">
                <button
                  type="submit"
                  className="order-form__submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Готуємо ваше замовлення..." : "Замовити випичку"}
                </button>
              </footer>
            </Form>
          )}
        </Formik>
      </aside>
    </div>
  );
}

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
        <Field name={name}>
          {({ form }: any) => 
            form.touched[name] && form.errors[name] 
              ? <div className="order-form__error-text">{form.errors[name]}</div> 
              : null
          }
        </Field>
      </div>
    </div>
  );
}
