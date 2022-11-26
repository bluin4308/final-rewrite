import React, { useEffect } from "react";
import useStore, { useTitle } from "../../store";
import { useQuery } from "@apollo/client";
import { GET_CART_ITEMS } from "../../apollo";
import Navigation from "../Navigation";
import Card from "./Card";
import NetworkError from "../NetworkError";
import Checkout from "./Checkout";
import "./style.scss";

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

export default function Cart() {
  const { clothes } = useStore();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Cart");
  }, []);

  const extractID = clothes.map((item) => item.id);
  const { data, loading, error } = useQuery(GET_CART_ITEMS, {
    fetchPolicy: "no-cache",
    variables: {
      array: extractID,
    },
  });

  return (
    <div className="cart-layout">
      <Navigation />
      <div className="_80percent">
        {/* EMPTY CART */}
        {clothes.length === 0 && !error && (
          <p className="empty-cart">Your cart is empty.</p>
        )}

        {/* WHEN DATA IS LOADED */}
        {clothes.length > 0 && !loading && !error && data && (
          <>
            {data.clothes.nodes.map((item, index) => {
              return <Card data={item} key={index} />;
            })}
            <Checkout />
          </>
        )}

        {/* ERROR BOUNDARY */}
        {!loading && !!error && <NetworkError />}

        {/* LOADING ANIMATION */}
        {loading && !data && clothes.length > 0 && <Loader />}
      </div>
    </div>
  );
}
