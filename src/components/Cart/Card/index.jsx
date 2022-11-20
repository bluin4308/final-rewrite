import React, { useState, useEffect } from "react";
import useStore from "../../../store";

const isSale = (item) => {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
};

export default function Card({ data }) {
  const { clothes, addSize, deleteSize, deleteCloth } = useStore();

  const clothIndex = clothes.findIndex((cloth) => cloth.id === data.id);

  const [s, setS] = useState(clothes[clothIndex].quantityS || 0);
  const [m, setM] = useState(clothes[clothIndex].quantityM || 0);
  const [l, setL] = useState(clothes[clothIndex].quantityL || 0);

  useEffect(() => {
    setS(clothes[clothIndex].quantityS || 0);
    setM(clothes[clothIndex].quantityM || 0);
    setL(clothes[clothIndex].quantityL || 0);
  }, [clothes]);

  if (((s == m) == l) == 0) {
    deleteCloth({ id: data.id });
    return;
  }

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
        <p>{s}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "s" })}>+</button>
          <button
            disabled={s === 0}
            onClick={() => deleteSize({ id: data.id, type: "s" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* M */}
        <p>{m}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "m" })}>+</button>
          <button
            disabled={m === 0}
            onClick={() => deleteSize({ id: data.id, type: "m" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* L */}
        <p>{l}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "l" })}>+</button>
          <button
            disabled={l === 0}
            onClick={() => deleteSize({ id: data.id, type: "l" })}
          >
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
