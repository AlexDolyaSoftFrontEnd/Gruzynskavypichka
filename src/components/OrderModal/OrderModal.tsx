"use client";

import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./OrderModal.css";

/* =========================
   Interfaces
========================= */

export interface OrderFormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
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
  city: "",
  address: "",
  comment: "",
};

/* =========================
   Validation
========================= */

const schema = Yup.object({
  name: Yup.string().min(2).required(),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/)
    .required(),
  email: Yup.string().email().required(),
  city: Yup.string().required(),
  address: Yup.string().required(),
  comment: Yup.string(),
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
      <div className="order-modal__backdrop" onClick={onClose} />

      <aside className="order-modal__panel">
        <h2 className="order-modal__title">Замовлення</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, helpers) => {
            console.log("ORDER:", values);
            helpers.resetForm();
            onClose();
          }}
        >
          {({ isValid }) => (
            <Form className="order-form">
              <FieldBlock name="name" label="Імʼя" />
              <FieldBlock name="phone" label="Телефон" placeholder="+380..." />
              <FieldBlock name="email" label="Email" type="email" />
              <FieldBlock name="city" label="Місто" />
              <FieldBlock name="address" label="Адреса" />
              <FieldBlock
                name="comment"
                label="Коментар"
                as="textarea"
              />

              <button type="submit" disabled={!isValid}>
                Замовити
              </button>

              <button type="button" onClick={onClose}>
                Закрити
              </button>
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
      <label htmlFor={name}>{label}</label>

      <Field
        id={name}
        name={name}
        as={as}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />

      <ErrorMessage name={name} component="span" />
    </div>
  );
}
