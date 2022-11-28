import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../store";
import Navigation from "../Navigation";
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
        <div className="links">
          <p>Other pages:</p>
          <Link to="../gifts">Gift cards</Link>
        </div>
      </div>
    </div>
  );
}
