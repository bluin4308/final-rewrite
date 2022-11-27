import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { useQuery } from "@apollo/client";
import { GET_ONE_ITEM } from "../../apollo";
import { isSale } from "../../helpers";
import useStore, { useTitle } from "../../store";
import Navigation from "../Navigation";
import NetworkError from "../NetworkError";
import Modal from "../Modal";
import MoreItems from "./MoreItems";
import "./style.scss";

const parser = new DOMParser();

export default function ClothPage() {
  const { id } = useParams();
  const [size, setSize] = useState(false);
  const [price, setPrice] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { addCloth } = useStore();

  const { setTitle } = useTitle();

  const { loading, data, error } = useQuery(GET_ONE_ITEM, {
    variables: {
      id: id,
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    setTitle(" ");
  }, []);

  const isSize = (chosenSize) => {
    return chosenSize === size ? true : false;
  };

  const handleSizeAndPrice = ({ size, price }) => {
    setSize(size);
    setPrice(price);
  };

  if (!loading && data) {
    const item = data.clothes.nodes[0];
    const descriptionContent = parser.parseFromString(item.content, "text/html")
      .body.textContent;
    const {
      customFields: { price: itemPrice, saleprice },
      title,
      featuredImage: {
        node: { sourceUrl },
      },
    } = item;
    const handleSubmit = () => {
      addCloth({ id: id, type: size, price: price, title: title });
      setShowModal(true);
    };

    // extract category name from item
    const tags = item.tags.nodes.filter((tag) => tag.name !== "sale")[0].name;

    return (
      <>
        <div className="cloth-page">
          <Navigation />
          <Modal showModal={showModal} setShowModal={setShowModal} />
          <div className="content">
            <ReactImageMagnify
              {...{
                imageStyle: {
                  borderRadius: "4px",
                  width: "90%",
                  height: "auto",
                  aspectRatio: "4/5",
                },
                imageClassName: "photo",
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: sourceUrl,
                },
                largeImage: {
                  src: sourceUrl,
                  width: 1200,
                  height: 1500,
                },
              }}
            />
            <div className="cloth-data">
              <p className="title">{title}</p>
              <p className="price">
                {isSale(item) ? (
                  <>Only ${saleprice} with sale!</>
                ) : (
                  <>${itemPrice}</>
                )}
              </p>
              <div className="description">
                <p className="description-title">Description:</p>
                <p className="description-content">{descriptionContent}</p>
              </div>
              <br />
              <p>Choose size and buy:</p>
              <div className="sizes">
                <button
                  onClick={() =>
                    handleSizeAndPrice({
                      size: "s",
                      price: isSale(item) ? saleprice : itemPrice,
                    })
                  }
                  className={"size-button" + (isSize("s") ? " active" : "")}
                >
                  s
                </button>
                <button
                  onClick={() =>
                    handleSizeAndPrice({
                      size: "m",
                      price: isSale(item) ? saleprice : itemPrice,
                    })
                  }
                  className={"size-button" + (isSize("m") ? " active" : "")}
                >
                  m
                </button>
                <button
                  onClick={() =>
                    handleSizeAndPrice({
                      size: "l",
                      price: isSale(item) ? saleprice : itemPrice,
                    })
                  }
                  className={"size-button" + (isSize("l") ? " active" : "")}
                >
                  l
                </button>
                <button
                  className="size-button"
                  disabled={!size}
                  onClick={() => handleSubmit()}
                >
                  buy
                </button>
              </div>
            </div>
          </div>
        </div>
        <MoreItems tags={tags} />
      </>
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
