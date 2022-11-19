import React, { useEffect } from "react";
import useStore, { useTitle } from "../../store";
import { useQuery } from "@apollo/client";
import { GET_CART_ITEMS } from "../../apollo";
import Navigation from "../Navigation";
import Card from "./Card";
import "./style.scss";

export default function Cart() {
  const { clothes } = useStore();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Cart");
  }, []);

  const extractID = clothes.map((item) => item.id);
  const { data, loading } = useQuery(GET_CART_ITEMS, {
    fetchPolicy: "no-cache",
    variables: {
      array: extractID,
    },
  });

  return (
    <div className="cart-layout">
      <Navigation />
      <div className="_80percent">
        {clothes.length === 0 && (
          <p className="empty-cart">Your cart is empty.</p>
        )}
        {clothes.length > 0 &&
          !loading &&
          data &&
          data.clothes.nodes.map((item, index) => {
            return <Card data={item} key={index} />;
          })}
      </div>
    </div>
  );
}
