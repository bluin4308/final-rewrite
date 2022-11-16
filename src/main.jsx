import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing";
import client from "./apollo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
