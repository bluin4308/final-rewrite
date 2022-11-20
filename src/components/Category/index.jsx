import React, { useEffect, useState } from "react";
import { useTitle } from "../../store";
import Navigation from "../Navigation";
import Pagination from "./Pagination";
import Card from "./Card";
import { useQuery } from "@apollo/client";
import "./style.scss";
import {
  GET_ITEMS,
  GET_ITEMS_PRICE_ASC,
  GET_ITEMS_PRICE_DESC,
  GET_ITEMS_TITLE_ASC,
  GET_ITEMS_TITLE_DESC,
} from "../../apollo";

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
  const [perPage, setPerPage] = useState("4");
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

  const queryObj = useQuery(selectQuery(query), {
    variables: variables,
    fetchPolicy: "no-cache",
  });
  if (!queryObj.loading && queryObj.data) {
    return (
      <div className="category">
        <Navigation />
        <div className="content">
          <Pagination
            query={query}
            setQuery={setQuery}
            perPage={perPage}
            queryObj={queryObj}
            setPerPage={setPerPage}
            setVariables={setVariables}
            variables={variables}
          />
          <div className="cards">
            {queryObj.data.clothes.nodes.map((item, index) => {
              return <Card data={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="category">
        <Navigation />
        <div className="content">
          <Pagination
            perPage={perPage}
            queryObj={queryObj}
            setPerPage={setPerPage}
            setVariables={setVariables}
            variables={variables}
          />
        </div>
      </div>
    );
  }
}
