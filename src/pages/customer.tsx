import CustomerTopPanel from "../components/CustomerTopPanel";
import CustomerProductsPanel from "../components/CustomerProductsPanel";
import { useState } from "react";
import Cart from "../components/Cart";

const Customer = () => {
  const [viewMode, setViewMode] = useState("products");
  const [cart, setCart] = useState<any>([]);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  if (viewMode == "products") {
    return (
      <>
        <CustomerTopPanel
          CTA={{ label: "View cart" }}
          view={{ viewMode, setViewMode }}
        />
        <CustomerProductsPanel cart={{ cart, setCart, addToCart }} />
      </>
    );
  } else if (viewMode == "cart") {
    return (
      <>
        <CustomerTopPanel
          CTA={{ label: "Browse products" }}
          view={{ viewMode, setViewMode }}
        />
        <Cart cart={{ cart, setCart, addToCart }} />
      </>
    );
  }
};

export default Customer;
