"use client";

import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./OrderModal.css";

export interface OrderFormValues {
  name: string;
  phone: string;
  address: string;
  deliveryTime: string; // Поле времени
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
  address: "",
  deliveryTime: "", // Поле времени
  comment: "",
};

const schema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов'язково"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Формат: +380XXXXXXXXX")
    .required("Обов'язково"),
  address: Yup.string()
    .min(10, "Будь ласка, вкажіть повну адресу з містом")
    .required("Обов'язково"),
  deliveryTime: Yup.string() // Валидация времени
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Формат: ГГ:ХХ (наприклад, 14:30)"
    )
    .required("Обов'язково"),
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
          <h2 id="order-modal-title" className="order-modal__title">
            Замовлення
          </h2>

          <div className="order-modal__subtitle">
            Смачні традиційні страви прямо до вашого столу
          </div>

          <button
            type="button"
            className="order-modal__close"
            onClick={onClose}
            aria-label="Закрити"
            title="Закрити вікно"
          >
            ×
          </button>
        </header>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, helpers) => {
            try {
              const WHATSAPP_NUMBER = "380935450594";

              const message = `
НОВЕ ЗАМОВЛЕННЯ

Ім'я: ${values.name}
Телефон: ${values.phone}
Адреса: ${values.address}
Час доставки: ${values.deliveryTime}

Коментар:
${values.comment || "немає"}

Час замовлення: ${new Date().toLocaleString("uk-UA")}
              `;

              const encodedMessage = encodeURIComponent(message.trim());
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

              window.open(whatsappUrl, "_blank");

              helpers.resetForm();
              onClose();
            } catch (err) {
              console.error(err);
              alert("Помилка при формуванні замовлення.");
            }
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="order-form" noValidate>
              <fieldset className="order-form__fields">
                <FieldBlock
                  name="name"
                  label="Ваше ім'я"
                  placeholder="Наприклад: Ніно, Гіоргі, Маріам"
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

                {/* Поле времени доставки */}
                <FieldBlock
                  name="deliveryTime"
                  label="Бажаний час доставки"
                  placeholder="Наприклад: 18:30"
                  type="text"
                  autoComplete="off"
                />

                <FieldBlock
                  name="comment"
                  label="Побажання до замовлення"
                  placeholder="Наприклад: гаряче хачапурі, додатково сир сулугуні..."
                  as="textarea"
                  autoComplete="off"
                />
              </fieldset>

              <footer className="order-form__actions">
                <button
                  type="submit"
                  className="order-form__submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Формуємо..." : "Замовити"}
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
      <label htmlFor={name} className="order-form__label">
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
        rows={as === "textarea" ? 4 : undefined}
      />

      <div className="order-form__error">
        <Field name={name}>
          {({ form }: any) =>
            form.touched[name] && form.errors[name] ? (
              <div className="order-form__error-text">
                {form.errors[name]}
              </div>
            ) : null
          }
        </Field>
      </div>
    </div>
  );
}