import React, { useEffect, useState } from "react";
import { useTitle } from "../../store";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_ITEMS } from "../../apollo";
import Navigation from "../Navigation";
import Card from "./Card";
import "./style.scss";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [doSearchItemsQuery, { loading, data }] = useLazyQuery(SEARCH_ITEMS, {
    fetchPolicy: "no-cache",
  });

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Search");
  }, []);

  useEffect(() => {
    if (searchText.trim() !== "") {
      doSearchItemsQuery({
        variables: {
          search: searchText.trim(),
        },
      });
    }
  }, [searchText]);

  return (
    <div className="search-layout">
      <Navigation />
      <div className="_80percent">
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        {!loading && data && searchText.trim().length > 0 && (
          <div className="results">
            {data.clothes.nodes.map((item, index) => {
              return <Card key={index} data={item} />;
            })}
          </div>
        )}
        {!loading && data && data.clothes.nodes.length === 0 && (
          <p className="no-results">no results</p>
        )}
        {loading && !data && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
