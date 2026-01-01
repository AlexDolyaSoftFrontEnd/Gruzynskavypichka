"use client";

import { useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import "./OrderModal.css";

/* ======================================================
   Types
====================================================== */

export type OrderFormValues = {
  name: string;
  phone: string;
  email: string;
  city: string;
  post: string;
  address: string;
};

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FieldName = keyof OrderFormValues;

type FieldBlockProps = {
  name: FieldName;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
};

/* ======================================================
   Initial values
====================================================== */

const initialValues: OrderFormValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  post: "",
  address: "",
};

/* ======================================================
   Validation schema
====================================================== */

const orderSchema: Yup.ObjectSchema<OrderFormValues> =
  Yup.object({
    name: Yup.string()
      .min(2, "Мінімум 2 символи")
      .required("Обовʼязкове поле"),

    phone: Yup.string()
      .matches(
        /^\+380\d{9}$/,
        "Формат: +380XXXXXXXXX"
      )
      .required("Обовʼязкове поле"),

    email: Yup.string()
      .email("Некоректна пошта")
      .required("Обовʼязкове поле"),

    city: Yup.string()
      .min(2, "Вкажіть місто")
      .required("Обовʼязкове поле"),

    post: Yup.string()
      .required("Вкажіть відділення або поштомат"),

    address: Yup.string()
      .min(5, "Занадто коротка адреса")
      .required("Обовʼязкове поле"),
  });

/* ======================================================
   Component
====================================================== */

export default function OrderModal({
  isOpen,
  onClose,
}: OrderModalProps) {
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
      <div
        className="order-modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="order-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
      >
        <header className="order-modal__header">
          <h1
            id="order-title"
            className="order-modal__title"
          >
            Замовлення
          </h1>
          <p className="order-modal__subtitle">
            Введіть дані отримувача нижче
          </p>
        </header>

        <Formik<OrderFormValues>
          initialValues={initialValues}
          validationSchema={orderSchema}
          onSubmit={(
            values: OrderFormValues,
            helpers: FormikHelpers<OrderFormValues>
          ) => {
            console.log("ORDER DATA:", values);

            // TODO: axios / fetch
            helpers.resetForm();
            onClose();
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form
              className="order-form"
              autoComplete="on"
            >
              <div className="order-form__grid">
                <FieldBlock
                  name="name"
                  label="Імʼя та прізвище"
                  placeholder="Ігор Ручкін"
                  autoComplete="name"
                />

                <FieldBlock
                  name="phone"
                  label="Телефон"
                  placeholder="+380971234567"
                  autoComplete="tel"
                />

                <FieldBlock
                  name="email"
                  type="email"
                  label="Електронна пошта"
                  placeholder="name@example.com"
                  autoComplete="email"
                />

                <FieldBlock
                  name="city"
                  label="Місто"
                  placeholder="Київ"
                />

                <FieldBlock
                  name="post"
                  label="Адреса пошти"
                  placeholder="Відділення / Поштомат"
                />

                <FieldBlock
                  name="address"
                  label="Адреса доставки"
                  placeholder="вул. Богдана Хмелінського"
                />
              </div>

              <button
                type="submit"
                className="order-form__submit"
                disabled={!isValid || isSubmitting}
              >
                Замовити
              </button>

              <button
                type="button"
                className="order-modal__close"
                onClick={onClose}
              >
                Закрити
              </button>
            </Form>
          )}
        </Formik>
      </aside>
    </div>
  );
}

/* ======================================================
   Field block
====================================================== */

function FieldBlock({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: FieldBlockProps) {
  return (
    <div className="order-form__field">
      <label htmlFor={name}>{label}</label>

      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />

      <ErrorMessage
        name={name}
        component="span"
        className="order-form__error"
      />
    </div>
  );
}
