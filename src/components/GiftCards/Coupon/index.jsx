import React, { useState } from "react";

export default function Coupon({ data }) {
  const [discountCode] = useState(data.title);

  return (
    <div className="coupon">
      <p>
        <span>Coupon name: </span>
        <span
          className="title"
          onClick={() => {
            navigator.clipboard.writeText(discountCode);
          }}
        >
          {data.title}
        </span>
      </p>
      <p>
        <span>Discount size: </span>
        <span className="discount">{data.customfields.discount}%</span>
      </p>
    </div>
  );
}
