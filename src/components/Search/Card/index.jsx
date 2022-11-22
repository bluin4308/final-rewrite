import React from "react";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  return (
    <div className="card">
      <Link to={"../all/" + data.id}>{data.title}</Link>
    </div>
  );
}
