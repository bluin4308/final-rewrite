import React from "react";
import { NavLink } from "react-router-dom";
import { useTitle } from "../../../store";
import "./style.scss";

export default function Topbar() {
  const { title } = useTitle();
  return (
    <div className="topbar">
      <div className="_20percent">
        <NavLink className="logo-link" to="/">
          logo
        </NavLink>
      </div>
      <div className="_80percent">
        <pre className="page-title">{title}</pre>
        <div className="link-group">
          <NavLink to="cart">
            {({ isActive }) => (
              <i
                className={
                  { isActive }
                    ? "fa-solid fa-cart-shopping"
                    : "fa-solid fa-cart-shopping active"
                }
              ></i>
            )}
          </NavLink>
          <NavLink to="search">
            {({ isActive }) => (
              <i
                className={
                  { isActive }
                    ? "fa-solid fa-magnifying-glass"
                    : "fa-solid fa-magnifying-glass active"
                }
              ></i>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
