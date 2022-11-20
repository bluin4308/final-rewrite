import React from "react";
import "./style.scss";

export default function Pagination({
  perPage,
  setPerPage,
  setQuery,
  query,
  queryObj,
  setVariables,
  variables,
}) {
  const options = [
    { value: "5", text: 5 },
    { value: "10", text: 10 },
    // { value: "6", text: 6 },
  ];

  return (
    <div className="pagination">
      <div className="selector">
        <p>Items per page</p>
        <select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
          {options.map(({ text, value }, index) => {
            return (
              <option key={index} value={value}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
      <div className="pagination-button-group">
        <button
          className="pagination-button"
          disabled={
            queryObj.loading || !queryObj.data.clothes.pageInfo.hasPreviousPage
          }
          onClick={() =>
            setVariables({
              before: queryObj.data.clothes.pageInfo.startCursor,
              last: parseInt(perPage),
              tags: variables.tags,
            })
          }
        >
          Previous
        </button>
        <button
          className="pagination-button"
          disabled={
            queryObj.loading || !queryObj.data.clothes.pageInfo.hasNextPage
          }
          onClick={() =>
            setVariables({
              after: queryObj.data.clothes.pageInfo.endCursor,
              first: parseInt(perPage),
              tags: variables.tags,
            })
          }
        >
          Next
        </button>
      </div>
      <div className="selector">
        <p>Sort by</p>
        <select value={query} onChange={(e) => setQuery(e.target.value)}>
          <option value="default">Default</option>
          <option value="priceASC">Price &uarr;</option>
          <option value="priceDESC">Price &darr;</option>
          <option value="titleASC">Alphabet &uarr;</option>
          <option value="titleDESC">Alphabet &darr;</option>
        </select>
      </div>
    </div>
  );
}
