import React from "react";

export default function Coupon({ data }) {
  return (
    <div className="coupon">
      <p>{data.title}</p>
      <p>{data.customfields.discount}</p>
    </div>
  );
}
