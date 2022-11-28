import React, { memo } from "react";
import { Link } from "react-router-dom";
import SubscribeForm from "./SubscribeForm";
import ContactForm from "./ContactForm";
import "./style.scss";

export default memo(function Footer() {
  return (
    <div className="footer">
      <SubscribeForm />
      <div className="flex">
        <ContactForm />
        <div className="about">
          <p className="label">About</p>
          <Link to="about">About us</Link>
          <Link to="#">We're hiring</Link>
          <Link to="#">Support</Link>
          <Link to="#">Find store</Link>
          <Link to="#">Shipment</Link>
          <Link to="#">Payment</Link>
          <Link to="gifts">Gift card</Link>
          <Link to="#">Return</Link>
          <Link to="#">Help</Link>
          {/* навлинки  */}
        </div>
        <div className="other">
          <p className="label">Store</p>
          <p>
            <i className="fa-solid fa-location-dot"></i>
            <span>Company Name</span>
          </p>
          <p>
            <i className="fa-solid fa-phone-flip"></i>
            <a href="tel:3808071973">38-08-07-1973</a>
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:feedback@dsa1mc.wp4.host">
              feedback@dsa1mc.wp4.host
            </a>
          </p>
          <p className="label">We accept</p>
          <p>
            <i className="fa-brands fa-cc-amex"></i>
            <span>Amex</span>
          </p>
          <p>
            <i className="fa-solid fa-credit-card"></i>
            <span>Credit cards</span>
          </p>
        </div>
      </div>
      <div className="copyright">Volodymyr Ukraintsev 2022</div>
    </div>
  );
});
