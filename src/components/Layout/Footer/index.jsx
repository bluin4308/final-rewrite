import React, { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.scss";

const SubscribeForm = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
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
            alert("All ok your message was sent");
            setSubmitting(false);
          } else {
            alert("Something goes wrong");
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
            className={errors.email && touched.email ? "error" : ""}
          />
          <button
            type="submit"
            disabled={!isValid || errors.email || isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default function Footer() {
  const matchRoot = useMatch("/");
  // const [subscribeEmail, setSubscribeEmail] = useState("");
  // const handleSubscribeForm = (mail) => {
  //   fetch;
  // };
  return (
    <div className="footer">
      {!!matchRoot && (
        <SubscribeForm />
        // <div className="subscribe-form">
        //   <p className="label">Subscribe</p>
        //   <p>To get special offers and VIP treatment:</p>
        //   <input
        //     type="email"
        //     value={subscribeEmail}
        //     placeholder="Enter email here"
        //     onChange={(e) => setSubscribeEmail(e.target.value)}
        //   />
        //   <button>Subscribe</button>
        // </div>
        // <Formik
        //   initialValues={{ email: "" }}
        //   validate={(values) => {
        //     const errors = {};
        //     if (!values.email) {
        //       errors.email = "Required";
        //     } else if (
        //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //     ) {
        //       errors.email = "Invalid email address";
        //     }
        //     return errors;
        //   }}
        //   onSubmit={(values, { setSubmitting }) => {
        //     setTimeout(() => {
        //       alert(JSON.stringify(values, null, 2));
        //       setSubmitting(false);
        //     }, 400);
        //   }}
        // >
        //   {({
        //     values,
        //     errors,
        //     touched,
        //     handleChange,
        //     handleBlur,
        //     handleSubmit,
        //     isSubmitting,
        //     /* and other goodies */
        //   }) => (
        //     <form onSubmit={handleSubmit} className="subscribe-form">
        //       <p className="label">Subscribe</p>
        //       <p>To get special offers and VIP treatment:</p>
        //       <input
        //         type="email"
        //         name="email"
        //         placeholder="Enter email here"
        //         onChange={handleChange}
        //         onBlur={handleBlur}
        //         value={values.email}
        //       />
        //       {errors.email && touched.email && errors.email}
        //       <button type="submit" disabled={isSubmitting}>
        //         Submit
        //       </button>
        //     </form>
        //   )}
        // </Formik>
      )}
      <div className="flex">
        <div className="contact-form">
          <p className="label">Contact</p>
          <p>Questions? Go ahead!</p>
          <br />
          <form>
            <input type="text" placeholder="Name" />
            <input type={"email"} placeholder="Email" />
            <input type="text" placeholder="Subject" />
            <input type="text" placeholder="Message" />
            <button type="submit">Send</button>
          </form>
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
