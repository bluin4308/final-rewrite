import React, { useState } from "react";
import Modal from "../../Modal";

const isSale = (item) => {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
};

export default function Card({ data }) {
  const [modal, setModal] = useState(false);

  return (
    <div className="card">
      <p onClick={() => setModal(true)}>{data.title}</p>
      <Modal
        visible={modal}
        closeModal={setModal}
        item={data}
        isSale={isSale(data)}
      />
    </div>
  );
}
