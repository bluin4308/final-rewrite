import React from "react";
import useStore from "../../../store";
import { isSale } from "../../../helpers";

export default function Card({ data }) {
  const { clothes, addSize, deleteSize, deleteCloth } = useStore();

  const clothIndex = clothes.findIndex((cloth) => cloth.id === data.id);

  const isLast = () => {
    if (clothes[clothIndex].quantityS) {
    }
  };

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
        <p>S: </p>
        <p>{clothes[clothIndex].quantityS || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "s" })}>+</button>
          <button
            disabled={clothes[clothIndex].quantityS === 0}
            onClick={() => deleteSize({ id: data.id, type: "s" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* M */}
        <p>M: </p>
        <p>{clothes[clothIndex].quantityM || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "m" })}>+</button>
          <button
            disabled={clothes[clothIndex].quantityM === 0}
            onClick={() => deleteSize({ id: data.id, type: "m" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* L */}
        <p>L: </p>
        <p>{clothes[clothIndex].quantityL || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "l" })}>+</button>
          <button
            disabled={clothes[clothIndex].quantityL === 0}
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
