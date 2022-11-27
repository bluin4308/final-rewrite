import React, { useEffect } from "react";
import Navigation from "../Navigation";
import { useTitle } from "../../store";
import { useQuery } from "@apollo/client";
import { GET_ALL_COUPONS } from "../../apollo";
import Coupon from "./Coupon";
import "./style.scss";

export default function GiftCard() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Gift cards");
  }, []);

  const { data, loading, error } = useQuery(GET_ALL_COUPONS, {
    fetchPolicy: "no-cache",
  });

  return (
    <div className="gifts">
      <Navigation />

      {/* ERROR BOUNDARY */}
      {!loading && !!error && (
        <div className="category">
          <Navigation />
          <NetworkError />
        </div>
      )}

      {/* DATA LOADED */}
      {data && !loading && (
        <>
          {/* <Navigation /> */}
          <div className="content">
            <p className="description">
              Use this coupons to get discount. Just click on coupon title to
              copy to the clipboard.
            </p>
            {data.coupons.nodes.map((item, index) => {
              return <Coupon data={item} key={index} />;
            })}
          </div>
        </>
      )}

      {/* LOADDING ANIMATION */}
      {loading && !data && <Loader />}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
