import React, { memo } from "react";
import { Formik } from "formik";

export default memo(function SubscribeForm() {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = true;
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = true;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const data = new FormData();
        data.append("email", values.email);
        fetch(
          "https://dsa1mc.wp4.host/wp-json/contact-form-7/v1/contact-forms/81/feedback",
          {
            method: "POST",
            body: data,
          }
        ).then((res) => {
          if (res.ok) {
            alert("Your message was sent!");
            setSubmitting(false);
            resetForm();
          } else {
            alert("Something goes wrong!");
            setSubmitting(false);
            resetForm();
          }
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <form onSubmit={handleSubmit} className="subscribe-form">
          <p className="label">Subscribe</p>
          <p>To get special offers and VIP treatment:</p>
          <input
            type="email"
            name="email"
            placeholder="Enter email here"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={String(
              (errors.email && dirty && "error") ||
                (!errors.email && dirty && "valid")
            )}
          />
          <button type="submit" disabled={!isValid || isSubmitting || !dirty}>
            Subscribe
          </button>
        </form>
      )}
    </Formik>
  );
});
