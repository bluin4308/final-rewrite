import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Modal({ showModal, setShowModal }) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="mark">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="modal-content-flex">
          {/* item was added to cart */}
          <p className="done">виконано</p>
          <p className="added">товар успішно додано у кошик</p>
          <div className="button-group">
            <p onClick={() => setShowModal(false)}>Продовжити покупки</p>
            <Link to="../cart">До кошика</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
