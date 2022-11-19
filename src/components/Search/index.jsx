import React, { useEffect, useState } from "react";
import useStore, { useTitle } from "../../store";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_ITEMS } from "../../apollo";
import Navigation from "../Navigation";
import "./style.scss";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchItems, searchItemsData] = useLazyQuery(SEARCH_ITEMS, {
    fetchPolicy: "no-cache",
  });

  const { addCloth } = useStore();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Search");
  }, []);

  useEffect(() => {
    if (searchText.trim() !== "") {
      searchItems({
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
        {!searchItemsData.loading &&
          searchItemsData.data &&
          searchText.trim().length > 0 && (
            <div className="results">
              {searchItemsData.data.clothes.nodes.map((item, index) => {
                return <Card key={index} data={item} />;
              })}
            </div>
          )}
      </div>
    </div>
  );
}
