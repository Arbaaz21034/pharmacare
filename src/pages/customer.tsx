import CustomerTopPanel from "../components/CustomerTopPanel";
import CustomerProductsPanel from "../components/CustomerProductsPanel";
import { useState } from "react";
import Cart from "../components/Cart";

const Customer = () => {
  const [viewMode, setViewMode] = useState("products");

  if (viewMode == "products") {
    return (
      <>
        <CustomerTopPanel
          CTA={{ label: "View cart" }}
          view={{ viewMode, setViewMode }}
        />
        <CustomerProductsPanel />
      </>
    );
  } else if (viewMode == "cart") {
    return (
      <>
        <CustomerTopPanel
          CTA={{ label: "Browse products" }}
          view={{ viewMode, setViewMode }}
        />
        <Cart />
      </>
    );
  }
};

export default Customer;
