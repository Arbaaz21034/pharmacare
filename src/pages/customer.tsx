import CustomerTopPanel from "../components/CustomerTopPanel";
import CustomerProductsPanel from "../components/CustomerProductsPanel";
import { useState } from "react";
import Cart from "../components/Cart";
import Link from "next/link";

// DEV NOTE: In case you want to refactor this code in the future,
// start by using the context api in the future. I really messed up by not using it.

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
        <div className="fixed bottom-0 left-0 p-4">
          <Link href="/prescriptions">
            <button className="mt-8 h-12 w-40 rounded-md bg-primary-500 text-sm text-white hover:cursor-pointer hover:bg-primary-400">
              View prescriptions
            </button>
          </Link>
        </div>
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
