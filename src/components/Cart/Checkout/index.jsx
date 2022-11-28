import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import useStore from "../../../store";
import Coupon from "./Coupon";

const composeString = (arr) => {
  const result = arr.map(
    ({ title, quantityL, quantityM, quantityS }) =>
      title +
      " Sizes " +
      `(S: ${quantityS || 0}` +
      ` M: ${quantityM || 0}` +
      ` L: ${quantityL || 0})`
  );
  const composedString = result.join(", ");
  return composedString;
};

export default function Checkout() {
  const { clothes, cleanClothes } = useStore();

  const totalSum = clothes.reduce((acc, obj) => {
    return acc + parseInt(obj.amount);
  }, 0);

  const [total, setTotal] = useState(totalSum);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    if (couponDiscount) {
      const newTotal = totalSum - totalSum * (Number(couponDiscount) / 100);
      setTotal(newTotal);
    } else {
      setTotal(totalSum);
    }
  }, [totalSum, couponDiscount]);

  return (
    <>
      <div className="checkout">
        <p className="form-title">Offer form</p>
        <Formik
          initialValues={{
            username: "",
            useremail: "",
            address: "",
            zip: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.useremail) {
              errors.useremail = true;
            }

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.useremail)
            ) {
              errors.useremail = true;
            }

            if (!values.username) {
              errors.username = true;
            }

            if (!values.address) {
              errors.address = true;
            }

            if (!values.zip) {
              errors.zip = true;
            } else if (/\D/.test(values.zip)) {
              errors.zip = true;
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const data = new FormData();
            data.append("username", values.username);
            data.append("useremail", values.useremail);
            data.append("address", values.address);
            data.append("zip", values.zip);
            data.append("total", total.toFixed(2));
            data.append("clothes", composeString(clothes));
            fetch(
              "https://dsa1mc.wp4.host/wp-json/contact-form-7/v1/contact-forms/91/feedback",
              {
                method: "POST",
                body: data,
              }
            ).then((res) => {
              if (res.ok) {
                alert("Your order was sent!");
                setSubmitting(false);
                resetForm();
                cleanClothes();
              } else {
                alert("Something went wrong!");
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
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-section">
                <label htmlFor="username">Full name</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={errors.username && touched.username ? "error" : ""}
                />
              </div>
              <div className="input-section">
                <label htmlFor="useremail">E-mail</label>
                <input
                  type="email"
                  name="useremail"
                  id="useremail"
                  placeholder="Enter email here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.useremail}
                  className={
                    errors.useremail && touched.useremail ? "error" : ""
                  }
                />
              </div>
              <div className="input-section">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className={errors.address && touched.address ? "error" : ""}
                />
              </div>
              <div className="input-section">
                <label htmlFor="zip">ZIP-code</label>
                <input
                  type="number"
                  name="zip"
                  id="zip"
                  placeholder="Your location zip code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zip}
                  className={errors.zip && touched.zip ? "error" : ""}
                />
              </div>
              <p className="total">
                {/* Total Sum: ${total} */}
                {couponDiscount
                  ? `Total amount with discount: $${total}`
                  : `Total amount without discount: $${total}`}
              </p>
              <button type="submit" disabled={!isValid || !dirty}>
                Buy
              </button>

              <Persist name="signup-form" />
            </form>
          )}
        </Formik>
      </div>
      <Coupon setCouponDiscount={setCouponDiscount} />
    </>
  );
}
