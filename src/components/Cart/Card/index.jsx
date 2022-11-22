import React from "react";
import useStore from "../../../store";
import { isSale } from "../../../helpers";

export default function Card({ data }) {
  const { clothes, addSize, deleteSize, deleteCloth } = useStore();

  const index = clothes.findIndex((cloth) => cloth.id === data.id);

  const item = clothes[index];

  const chosenOnlyOneSize = () => {
    if (item.quantityS === 1 && !item.quantityM && !item.quantityL) {
      return true;
    }
    if (!item.quantityS && item.quantityM === 1 && !item.quantityL) {
      return true;
    }
    if (!item.quantityS && !item.quantityM && item.quantityL === 1) {
      return true;
    }

    return false;
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
        <p>{item.quantityS || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "s" })}>+</button>
          <button
            disabled={item.quantityS === 0 || chosenOnlyOneSize()}
            onClick={() => deleteSize({ id: data.id, type: "s" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* M */}
        <p>M: </p>
        <p>{item.quantityM || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "m" })}>+</button>
          <button
            disabled={item.quantityM === 0 || chosenOnlyOneSize()}
            onClick={() => deleteSize({ id: data.id, type: "m" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* L */}
        <p>L: </p>
        <p>{item.quantityL || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: data.id, type: "l" })}>+</button>
          <button
            disabled={item.quantityL === 0 || chosenOnlyOneSize()}
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
