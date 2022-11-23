import React, { useEffect } from "react";
import Navigation from "../Navigation";
import { useTitle } from "../../store";
import "./style.scss";

export default function About() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("About");
  }, []);

  return (
    <div className="about">
      <Navigation />
      <div className="description">
        <p className="logo">logo</p>
        <p>
          Our LOGO store was founded in 2022. We sell two categories of
          clothing: jeans and jackets of different clothing styles for customers
          of all ages and types. We will be glad if you buy something in our
          store!
        </p>
      </div>
    </div>
  );
}
