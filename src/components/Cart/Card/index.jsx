import React from "react";
import useStore from "../../../store";

const isSale = (item) => {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
};

export default function Card({ data }) {
  const { changeSize, deleteCloth } = useStore();

  return (
    <div className="card">
      <img
        src={data.featuredImage.node.sourceUrl}
        alt={data.featuredImage.node.title}
      />
      <p className="title">{data.title}</p>
      {isSale(data) ? (
        <p className="price sale">${data.customFields.saleprice}</p>
      ) : (
        <p className="price">${data.customFields.price}</p>
      )}
    </div>
  );
}
