import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import SaleBanner from "../SaleBanner";
import Category from "../Category";
import Cart from "../Cart";
import Search from "../Search";
import About from "../About";
import ClothPage from "../ClothPage";
import GiftCards from "../GiftCards";
import NotFoundPage from "../NotFoundPage";
const Sale = () => {
  return <Category tags={["sale"]} title="Sale" />;
};

const Jeans = () => {
  return <Category tags={["jeans"]} title="Jeans" />;
};

const Jackets = () => {
  return <Category tags={["jacket"]} title="Jackets" />;
};

const AllClothes = () => {
  return <Category tags={[]} title="All clothes" />;
};

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SaleBanner />} />
        <Route path="about" element={<About />} />
        <Route path="gifts" element={<GiftCards />} />
        <Route path="search" element={<Search />} />
        <Route path="cart" element={<Cart />} />
        <Route path="sale" element={<Sale />} />
        <Route path="sale/:id" element={<ClothPage />} />
        <Route path="jeans" element={<Jeans />} />
        <Route path="jeans/:id" element={<ClothPage />} />
        <Route path="jackets" element={<Jackets />} />
        <Route path="jackets/:id" element={<ClothPage />} />
        <Route path="all" element={<AllClothes />} />
        <Route path="all/:id" element={<ClothPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
