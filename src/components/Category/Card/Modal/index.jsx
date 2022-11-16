import React, { useState } from "react";
import useStore from "../../../../store";
import "./style.scss";

export default function Modal({ visible, closeModal, item, isSale }) {
  const [size, setSize] = useState(false);
  const { addCloth } = useStore();

  if (!visible) {
    return null;
  }

  const isSize = (chosenSize) => {
    return chosenSize === size ? true : false;
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="close-button">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => closeModal(false)}
          >
            <path
              fillRule="evenodd"
              d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
            />
          </svg>
        </div>
        <div className="modal-content-flex">
          <img
            src={item.featuredImage.node.sourceUrl}
            alt={item.featuredImage.node.title}
          />
          <div className="content">
            <p className="title">{item.title}</p>
            {isSale ? (
              <p className="price">${item.customFields.saleprice}</p>
            ) : (
              <p className="price">${item.customFields.price}</p>
            )}
            <div className="sizes">
              <button
                onClick={() => setSize("s")}
                className={"size-button" + (isSize("s") ? " active" : "")}
              >
                s
              </button>
              <button
                onClick={() => setSize("m")}
                className={"size-button" + (isSize("m") ? " active" : "")}
              >
                m
              </button>
              <button
                onClick={() => setSize("l")}
                className={"size-button" + (isSize("l") ? " active" : "")}
              >
                l
              </button>
              <button
                className="add-cart-button"
                disabled={!size}
                onClick={() => addCloth({ id: item.id, type: size })}
              >
                buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
