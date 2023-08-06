import { Box } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import "./SideMenus.scss";

const SideMenus = () => {
  return (
    <React.Fragment>
      <Box className="menu">
        <Link to="companies">Companies</Link>
        <Link to="items">Items</Link>
        <Link to="suppliers">Supplier</Link>
        <Link to="areas">Areas</Link>
        <Link to="customer">Customer</Link>
        <Link to="order-booker">Order Booker</Link>
        <Link to="order-booker-areas">Order Booker Areas</Link>
      </Box>
    </React.Fragment>
  );
};
export default SideMenus;
