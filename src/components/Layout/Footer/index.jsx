import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Formik } from "formik";
import SubscribeForm from "./SubscribeForm";
import "./style.scss";

export default function Footer() {
  const matchRoot = useMatch("/");
  return (
    <div className="footer">
      {!!matchRoot && <SubscribeForm />}
      <div className="flex">
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
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.message) {
                errors.message = "Required";
              }
              if (!values.subject) {
                errors.subject = "Required";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
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
                } else {
                  alert("Something goes wrong!");
                  setSubmitting(false);
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
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={errors.username && touched.username ? "error" : ""}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={errors.email && touched.email ? "error" : ""}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                  className={errors.subject && touched.subject ? "error" : ""}
                />
                <input
                  type="text"
                  name="message"
                  placeholder="Message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  className={errors.message && touched.message ? "error" : ""}
                />
                <button
                  type="submit"
                  disabled={
                    !isValid ||
                    errors.email ||
                    errors.message ||
                    errors.username ||
                    errors.subject ||
                    isSubmitting ||
                    !dirty
                  }
                >
                  Send
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="about">
          <p className="label">About</p>
          <NavLink to="about">About us</NavLink>
          <NavLink to="careers">We're hiring</NavLink>
          <NavLink to="#">Support</NavLink>
          <NavLink to="#">Find store</NavLink>
          <NavLink to="#">Shipment</NavLink>
          <NavLink to="#">Payment</NavLink>
          <NavLink to="#">Gift card</NavLink>
          <NavLink to="#">Return</NavLink>
          <NavLink to="#">Help</NavLink>
          {/* навлинки  */}
        </div>
        <div className="other">
          <p className="label">Store</p>
          <p>
            <i class="fa-solid fa-location-dot"></i>
            <span>Company Name</span>
          </p>
          <p>
            <i class="fa-solid fa-phone-flip"></i>
            <a href="tel:3808071973">38-08-07-1973</a>
          </p>
          <p>
            <i class="fa-solid fa-envelope"></i>
            <a href="mailto:feedback@dsa1mc.wp4.host">
              feedback@dsa1mc.wp4.host
            </a>
          </p>
          <p className="label">We accept</p>
          <p>
            <i class="fa-brands fa-cc-amex"></i>
            <span>Amex</span>
          </p>
          <p>
            <i class="fa-solid fa-credit-card"></i>
            <span>Credit cards</span>
          </p>
        </div>
      </div>
      <div className="copyright">Volodymyr Ukraintsev 2022</div>
    </div>
  );
}
