import { type NextPage } from "next";
import React from "react";
import CustomerTopPanel from "../components/CustomerTopPanel";

const CartPage: NextPage = () => {
  return (
    <>
      <CustomerTopPanel CTA={{ link: "/customer", label: "Browse products" }} />
      <div></div>
    </>
  );
};

export default CartPage;
