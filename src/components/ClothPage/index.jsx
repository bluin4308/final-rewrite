import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation";
import { useQuery } from "@apollo/client";
import { GET_ONE_ITEM } from "../../apollo";
import "./style.scss";

export default function ClothPage() {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_ONE_ITEM, {
    variables: {
      id: id,
    },
    fetchPolicy: "no-cache",
  });

  if (!loading && data) {
    return (
      <div className="cloth-page">
        <Navigation />
        <div className="content">{data.clothes.nodes[0].title}</div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="cloth-page">
        <Navigation />
        <div className="content">
          <div className="loader">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
