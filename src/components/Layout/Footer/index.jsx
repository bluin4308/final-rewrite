import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import SubscribeForm from "./SubscribeForm";
import ContactForm from "./ContactForm";
import "./style.scss";

export default function Footer() {
  const matchRoot = useMatch("/");
  return (
    <div className="footer">
      {!!matchRoot && <SubscribeForm />}
      <div className="flex">
        <ContactForm />
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
