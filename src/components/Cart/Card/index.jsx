import React from "react";
import useStore from "../../../store";
import { isSale } from "../../../helpers";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  const { clothes, addSize, deleteSize, deleteCloth } = useStore();

  const index = clothes.findIndex((cloth) => cloth.id === data.id);

  const item = clothes[index];
  const {
    title,
    id,
    featuredImage: {
      node: { sourceUrl, title: alt },
    },
    customFields: { price, saleprice },
  } = data;

  const { quantityL, quantityM, quantityS } = item;

  const chosenOnlyOneSize = () => {
    if (quantityS === 1 && !quantityM && !quantityL) {
      return true;
    }
    if (!quantityS && quantityM === 1 && !quantityL) {
      return true;
    }
    if (!quantityS && !quantityM && quantityL === 1) {
      return true;
    }

    return false;
  };

  const handleDelete = () => {
    deleteCloth({ id: id });
  };

  return (
    <div className="card">
      <img src={sourceUrl} alt={alt} />
      <Link className="title" to={"../all/" + id}>
        {title}
      </Link>
      {isSale(data) ? (
        <p className="price">${saleprice}</p>
      ) : (
        <p className="price">${price}</p>
      )}
      <div className="size-group">
        {/* S */}
        <p>S: </p>
        <p>{quantityS || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: id, type: "s" })}>+</button>
          <button
            disabled={!quantityS || chosenOnlyOneSize()}
            onClick={() => deleteSize({ id: id, type: "s" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* M */}
        <p>M: </p>
        <p>{quantityM || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: id, type: "m" })}>+</button>
          <button
            disabled={!quantityM || chosenOnlyOneSize()}
            onClick={() => deleteSize({ id: id, type: "m" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="size-group">
        {/* L */}
        <p>L: </p>
        <p>{quantityL || 0}</p>
        <div className="button-group">
          <button onClick={() => addSize({ id: id, type: "l" })}>+</button>
          <button
            disabled={!quantityL || chosenOnlyOneSize()}
            onClick={() => deleteSize({ id: id, type: "l" })}
          >
            -
          </button>
        </div>
      </div>
      <div className="delete-cloth">
        <button onClick={() => handleDelete()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
