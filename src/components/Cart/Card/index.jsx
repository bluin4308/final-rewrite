import React from "react";
import useStore from "../../../store";

const isSale = (item) => {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
};

export default function Card({ data }) {
  const { clothes, addSize, deleteSize, deleteCloth } = useStore();
  const clothIndex = clothes.findIndex((cloth) => cloth.id === data.id);
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
      <div className="size-group">
        {/* S */}
        <p>
          {clothes[clothIndex].quantityS ? clothes[clothIndex].quantityS : 0}
        </p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "s" })}>+</button>
          <button onClick={() => deleteSize({ id: data.id, type: "s" })}>
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* M */}
        <p>
          {clothes[clothIndex].quantityM ? clothes[clothIndex].quantityM : 0}
        </p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "m" })}>+</button>
          <button onClick={() => deleteSize({ id: data.id, type: "m" })}>
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* L */}
        <p>
          {clothes[clothIndex].quantityL ? clothes[clothIndex].quantityL : 0}
        </p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "l" })}>+</button>
          <button onClick={() => deleteSize({ id: data.id, type: "l" })}>
            -
          </button>
        </div>
      </div>
      <div className="delete-cloth">
        <button onClick={() => deleteCloth({ id: data.id })}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
