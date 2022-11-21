import React from "react";
import { Link } from "react-router-dom";
// import Modal from "../../Modal";
import "./style.scss";

const isSale = (item) => {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
};

export default function Card({ data }) {
  // const [modal, setModal] = useState(false);

  return (
    <div className="card">
      <img
        className="photo"
        src={data.featuredImage.node.sourceUrl}
        alt={data.featuredImage.node.title}
      />

      {isSale(data) && <div className="sale-badge">sale</div>}

      {isSale(data) ? (
        <div className="sale-price">${data.customFields.saleprice}</div>
      ) : (
        <div className="default-price">${data.customFields.price}</div>
      )}

      <Link className="title" to={data.id}>
        {data.title}
      </Link>
      {/* <Modal
        visible={modal}
        closeModal={setModal}
        item={data}
        isSale={isSale(data)}
      /> */}
    </div>
  );
}
