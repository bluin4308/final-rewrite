import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ONE_ITEM } from "../../apollo";
import { isSale } from "../../helpers";
import Navigation from "../Navigation";
import NetworkError from "../NetworkError";
import "./style.scss";

const parser = new DOMParser();

export default function ClothPage() {
  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_ONE_ITEM, {
    variables: {
      id: id,
    },
    fetchPolicy: "no-cache",
  });

  if (!loading && data) {
    const item = data.clothes.nodes[0];

    return (
      <div className="cloth-page">
        <Navigation />
        <div className="content">
          <img
            className="photo"
            src={item.featuredImage.node.sourceUrl}
            alt={item.featuredImage.node.title}
          />
          <div className="cloth-data">
            <p className="title">{item.title}</p>
            <p className="price">
              $
              {isSale(item) ? (
                <>{item.customFields.saleprice} with sale</>
              ) : (
                <>{item.customFields.price}</>
              )}
            </p>
            <p className="description-title">Description:</p>
            <p className="">
              {
                parser.parseFromString(item.content, "text/html").body
                  .textContent
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="cloth-page">
        <Navigation />
        <div className="content">
          <div className="loader-container">
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
      </div>
    );
  }

  if (!loading && !!error) {
    return (
      <div className="cloth-page">
        <Navigation />
        <NetworkError />
      </div>
    );
  }
}
