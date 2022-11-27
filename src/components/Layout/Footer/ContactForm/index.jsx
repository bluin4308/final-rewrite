import React from "react";
import { Formik } from "formik";

export default function ContactForm() {
  return (
    <div className="contact-form">
      <p className="label">Contact</p>
      <p>Questions? Go ahead!</p>
      <br />
      <Formik
        initialValues={{
          username: "",
          email: "",
          subject: "",
          message: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = true;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = true;
          }
          if (!values.username) {
            errors.username = true;
          }
          if (!values.message) {
            errors.message = true;
          }
          if (!values.subject) {
            errors.subject = true;
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const data = new FormData();
          data.append("email", values.email);
          data.append("message", values.message);
          data.append("subject", values.subject);
          data.append("username", values.username);
          fetch(
            "https://dsa1mc.wp4.host/wp-json/contact-form-7/v1/contact-forms/82/feedback",
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter your full name here"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={
                (errors.username && touched.username && "error") ||
                (!errors.username && dirty && "valid") ||
                " "
              }
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email here"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={
                (errors.email && touched.email && "error") ||
                (!errors.email && dirty && "valid") ||
                " "
              }
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              className={
                (errors.subject && touched.subject && "error") ||
                (!errors.subject && dirty && "valid") ||
                " "
              }
            />
            <input
              type="text"
              name="message"
              placeholder="Message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              className={
                (errors.message && touched.message && "error") ||
                (!errors.message && dirty && "valid") ||
                " "
              }
            />
            <button type="submit" disabled={!isValid || isSubmitting || !dirty}>
              Send
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
