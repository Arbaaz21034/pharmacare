import CustomerTopPanel from "../components/CustomerTopPanel";
import CustomerProductsPanel from "../components/CustomerProductsPanel";
import { useState } from "react";
import Cart from "../components/Cart";

const Customer = () => {
  const [viewMode, setViewMode] = useState("products");
  const [cart, setCart] = useState<any>([]);

  const addToCart = (productID: number) => {
    // Check if product is already in cart
    const productInCart = cart.find((item: any) => {
      if (item == null) return false;
      return item.id == productID;
    });
    console.log("produtincart ", productInCart);
    if (productInCart) {
      // If product is already in cart, increase quantity by 1
      const newCart = cart.map((item: any) => {
        if (item.id == productID) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(newCart);
    }
    // If product is not in cart, add it to cart
    else {
      setCart([...cart, { id: productID, quantity: 1 }]);
    }

    console.log(cart);
  };

  const removeFromCart = (productID: number) => {
    // remove one quantity of product from cart
    if (cart.length <= 0) return;
    const newCart = cart.map((item: any) => {
      if (item == null) return null;
      if (item.id == productID) {
        if (item.quantity == 1) return null;
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    if (newCart != null) {
      setCart(newCart);
    }

    console.log(cart);
  };

  if (viewMode == "products") {
    return (
      <>
        <CustomerTopPanel
          CTA={{ label: "View cart" }}
          view={{ viewMode, setViewMode }}
        />
        <CustomerProductsPanel
          cart={{ cart, setCart, addToCart, removeFromCart }}
        />
      </>
    );
  } else if (viewMode == "cart") {
    return (
      <>
        <CustomerTopPanel
          CTA={{ label: "Browse products" }}
          view={{ viewMode, setViewMode }}
        />
        <Cart cart={{ cart, setCart, addToCart, removeFromCart }} />
      </>
    );
  }
};

export default Customer;
