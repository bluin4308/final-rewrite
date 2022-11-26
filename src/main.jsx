import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./helpers";
import Routing from "./components/Routing";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ScrollToTop />
        <Routing />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
