import React, { useState } from "react";
import { useMatch } from "react-router-dom";
import "./style.scss";

export default function Footer() {
  const matchRoot = useMatch("/");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  return (
    <div className="footer">
      {!!matchRoot && (
        <div className="subscribe-form">
          <p className="label">Subscribe</p>
          <p>To get special offers and VIP treatment:</p>
          <input
            type="email"
            value={subscribeEmail}
            placeholder="Enter email here"
            onChange={(e) => setSubscribeEmail(e.target.value)}
          />
          <button>Subscribe</button>
        </div>
      )}
      <div className="flex">
        <div className="contact-form">
          <p className="label">Contact</p>
          <p>Questions? Go ahead!</p>
          <form>
            <input type="text" placeholder="Name" />
            <input type={"email"} placeholder="Email" />
            <input type="text" placeholder="Subject" />
            <input type="text" placeholder="Message" />
            <button>Send</button>
          </form>
        </div>
        <div>
          <p className="label">About</p>
          {/* навлинки  */}
        </div>
        <div></div>
      </div>
    </div>
  );
}
