import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_COUPON } from "../../../../apollo";
import "./style.scss";

export default function Coupon({ setCouponDiscount }) {
  const [couponTitle, setCouponTitle] = useState("");
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [doCouponQuery, { data, loading }] = useLazyQuery(GET_COUPON, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (couponTitle.trim() !== "") {
      doCouponQuery({
        variables: {
          title: couponTitle.trim(),
        },
      });
    }
  }, [couponTitle]);

  useEffect(() => {
    if (data && !loading && data.coupons.nodes[0]) {
      setCurrentDiscount(data.coupons.nodes[0].customfields.discount);
      setCouponDiscount(data.coupons.nodes[0].customfields.discount);
    }
  }, [loading]);

  return (
    <div className="get-coupon">
      <p>Input coupon code and get your discount!</p>
      <input
        type="text"
        value={couponTitle}
        onChange={(e) => {
          setCouponTitle(e.target.value.trim());
        }}
      />
      <p>You current discount is {currentDiscount}%.</p>
    </div>
  );
}
