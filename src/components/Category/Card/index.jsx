import React from "react";
import { Link } from "react-router-dom";
import { isSale } from "../../../helpers";
import "./style.scss";

export default function Card({ data }) {
  const {
    id,
    title,
    customFields: { saleprice, price },
    featuredImage: {
      node: { sourceUrl, title: alt },
    },
  } = data;
  return (
    <div className="card">
      <img className="photo" src={sourceUrl} alt={alt} />

      {isSale(data) && <div className="sale-badge">sale</div>}

      {isSale(data) ? (
        <div className="sale-price">${saleprice}</div>
      ) : (
        <div className="default-price">${price}</div>
      )}

      <Link className="title" to={id}>
        {title}
      </Link>
    </div>
  );
}
