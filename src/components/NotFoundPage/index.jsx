import React from "react";
import Navigation from "../Navigation";
import "./style.scss";

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <Navigation />
      <p className="warning">Page not found</p>
    </div>
  );
}
