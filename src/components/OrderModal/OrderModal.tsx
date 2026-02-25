"use client";

import { useEffect, useRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./OrderModal.css";

export interface OrderFormValues {
  name: string;
  phone: string;
  address: string;
  deliveryTime: string;
  comment: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FieldAsType = "input" | "textarea";

interface FieldBlockProps {
  name: keyof OrderFormValues;
  label: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  as?: FieldAsType;
  rows?: TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
  inputMode?: InputHTMLAttributes<HTMLElement>["inputMode"];
  role?: InputHTMLAttributes<HTMLElement>["role"];
  pattern?: InputHTMLAttributes<HTMLInputElement>["pattern"];
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}

const initialValues: OrderFormValues = {
  name: "",
  phone: "",
  address: "",
  deliveryTime: "",
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
  deliveryTime: Yup.string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Формат: ГГ:ХХ (наприклад, 14:30)"
    )
    .required("Обов'язково"),
  comment: Yup.string().max(500, "Максимум 500 символів"),
});

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = previousOverflow;
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="order-modal order-modal--open" role="presentation">
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
          <p className="order-modal__subtitle">Грузинська кухня</p>

          <button
            type="button"
            ref={closeRef}
            className="order-modal__close"
            onClick={onClose}
            aria-label="Закрити вікно"
          >
            <span aria-hidden="true">&times;</span>
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
              `.trim();

              const encodedMessage = encodeURIComponent(message);
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
              <fieldset className="order-form__fieldset">
                <legend className="order-form__legend">Дані для доставки</legend>

                <FieldBlock
                  name="name"
                  label="Ваше ім'я"
                  placeholder="Наприклад: Ніно, Гіоргі, Маріам"
                  autoComplete="name"
                  inputRef={firstFieldRef}
                />

                <FieldBlock
                  name="phone"
                  label="Номер телефону"
                  placeholder="+380 XX XXX XX XX"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />

                <FieldBlock
                  name="address"
                  label="Адреса доставки"
                  placeholder="Зона доставки: до 20 км від Віти-Поштової"
                  autoComplete="shipping street-address"
                />

                <FieldBlock
                  name="deliveryTime"
                  label="Бажаний час доставки"
                  placeholder="Наприклад: 18:30"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{2}:[0-9]{2}"
                  role="textbox"
                />

                <FieldBlock
                  name="comment"
                  label="Побажання до замовлення"
                  placeholder="Наприклад: гаряче хачапурі, додатково сир сулугуні..."
                  as="textarea"
                  rows={4}
                  role="textbox"
                />
              </fieldset>

              <footer className="order-form__actions">
                <button
                  type="submit"
                  className="order-form__submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Обробка..." : "Підтвердити замовлення"}
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
  rows,
  inputMode,
  role,
  pattern,
  inputRef,
  ...props
}: FieldBlockProps & {
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;

  const commonProps = {
    id: fieldId,
    name,
    placeholder,
    autoComplete,
    className: "order-form__input",
    "aria-describedby": errorId,
    role,
  };

  if (as === "textarea") {
    return (
      <div className="order-form__field">
        <label htmlFor={fieldId} className="order-form__label">
          {label}
        </label>

        <Field
          as="textarea"
          {...commonProps}
          rows={rows}
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />

        <ErrorMessage
          name={name}
          component="span"
          id={errorId}
          className="order-form__error"
        />
      </div>
    );
  }

  return (
    <div className="order-form__field">
      <label htmlFor={fieldId} className="order-form__label">
        {label}
      </label>

      <Field
        as="input"
        type={type}
        {...commonProps}
        inputMode={inputMode}
        pattern={pattern}
        ref={inputRef as React.RefObject<HTMLInputElement>}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />

      <ErrorMessage
        name={name}
        component="span"
        id={errorId}
        className="order-form__error"

      />
    </div>
  );
}