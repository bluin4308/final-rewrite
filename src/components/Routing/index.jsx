import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import SaleBanner from "../SaleBanner";
import Category from "../Category";

const Sale = () => {
  return <Category tags={["sale"]} title="Sale" />;
};

// const SaleBanner = () => {
//   return <SaleBanner />;
// };

const Jeans = () => {
  return <Category tags={["jeans"]} title="Jeans" />;
};

const Jackets = () => {
  return <Category tags={["jacket"]} title="Jackets" />;
};

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SaleBanner />} />
        <Route path="search" element={<p>search</p>} />
        <Route path="cart" element={<p>cart</p>} />
        <Route path="sale" element={<Sale />} />
        <Route path="jeans" element={<Jeans />} />
        <Route path="jackets" element={<Jackets />} />
        <Route path="*" element={<p>error</p>} />
      </Route>
    </Routes>
  );
}
