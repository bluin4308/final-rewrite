import React, { useEffect, useState } from "react";
import { useTitle } from "../../store";
import Navigation from "../Navigation";
import Pagination from "./Pagination";
import Card from "./Card";
import NetworkError from "../NetworkError";
import { useQuery } from "@apollo/client";
import "./style.scss";
import {
  GET_ITEMS,
  GET_ITEMS_PRICE_ASC,
  GET_ITEMS_PRICE_DESC,
  GET_ITEMS_TITLE_ASC,
  GET_ITEMS_TITLE_DESC,
} from "../../apollo";

const Loader = () => {
  return (
    <div className="loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

function selectQuery(filter) {
  switch (filter) {
    case "default":
      return GET_ITEMS;

    case "titleASC":
      return GET_ITEMS_TITLE_ASC;

    case "titleDESC":
      return GET_ITEMS_TITLE_DESC;

    case "priceASC":
      return GET_ITEMS_PRICE_ASC;

    case "priceDESC":
      return GET_ITEMS_PRICE_DESC;
  }
}

export default function Category({ tags, title }) {
  const [query, setQuery] = useState("default");
  const { setTitle } = useTitle();
  const [perPage, setPerPage] = useState("8");
  const [variables, setVariables] = useState({
    tags: tags || [""],
    first: parseInt(perPage),
  });

  useEffect(() => {
    setTitle(title);
  }, []);

  useEffect(() => {
    setVariables({
      tags: tags || [""],
      first: parseInt(perPage),
    });
  }, [query]);

  useEffect(() => {
    setVariables({
      tags: tags || [""],
      first: parseInt(perPage),
    });
  }, [perPage]);

  const { data, loading, error } = useQuery(selectQuery(query), {
    variables: variables,
    fetchPolicy: "no-cache",
  });

  return (
    <>
      {/* ERROR BOUNDARY */}
      {!loading && !!error && (
        <div className="category">
          <Navigation />
          <NetworkError />
        </div>
      )}

      {/* WHEN DATA IS LOADED */}
      {!loading && data && (
        <div className="category">
          <Navigation />
          <div className="content">
            <Pagination
              query={query}
              setQuery={setQuery}
              perPage={perPage}
              data={data}
              loading={loading}
              setPerPage={setPerPage}
              setVariables={setVariables}
              variables={variables}
            />
            <div className="cards">
              {data.clothes.nodes.map((item, index) => {
                return <Card data={item} key={index} />;
              })}
            </div>
          </div>
        </div>
      )}

      {/* LOADING ANIMATION */}
      {loading && !data && (
        <div className="category">
          <Navigation />
          <div className="content">
            <Pagination
              data={data}
              loading={loading}
              setPerPage={setPerPage}
              setVariables={setVariables}
              variables={variables}
            />
            <Loader />
          </div>
        </div>
      )}
    </>
  );
}
