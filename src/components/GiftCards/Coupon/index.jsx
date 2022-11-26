import React, { useState } from "react";

export default function Coupon({ data }) {
  const [discountCode] = useState(data.customfields.discount);

  return (
    <div className="coupon">
      <p>
        <span>Coupon name: </span>
        <span className="title">{data.title}</span>
      </p>
      <p>
        <span>Discount size: </span>
        <span
          className="discount"
          onClick={() => {
            navigator.clipboard.writeText(discountCode);
          }}
        >
          {data.customfields.discount}
        </span>
      </p>
    </div>
  );
}
