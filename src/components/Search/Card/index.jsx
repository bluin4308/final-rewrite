import React from "react";
import { Link } from "react-router-dom";
// import Modal from "../../Modal";

export default function Card({ data }) {
  // const [modal, setModal] = useState(false);
  // onClick={() => setModal(true)
  return (
    <div className="card">
      <Link to={"../all/" + data.id}>{data.title}</Link>
      {/* <Modal
        visible={modal}
        closeModal={setModal}
        item={data}
        isSale={isSale(data)}
      /> */}
    </div>
  );
}
