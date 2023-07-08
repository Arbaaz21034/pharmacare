import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  medicineImages,
  randint,
  toastError,
  toastSuccess,
} from "../utils/misc";
import Product from "../components/Product";

const CustomerProductsPanel = (props: any) => {
  const [products, setProducts] = useState([]);
  const cart = props.cart;

  const selectOptions = [
    { value: "pain-relief", label: "Pain relief" },
    { value: "allergy-relief", label: "Allergy" },
    { value: "cholesterol ", label: "Cholesterol" },
    { value: "diabetes", label: "Diabetes" },
    { value: "blood-pressure", label: "Blood Pressure" },
    { value: "antibiotics", label: "Antibiotics" },
    { value: "acid-reflux", label: "Acid Reflux" },
    { value: "cold-and-flu", label: "Cold & Flu" },
    { value: "digestive", label: "Digestive" },
  ];
  // fetch all products at page load
  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL + "/api/products/all";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const mutatedData = data.products;
        console.log(mutatedData);
        mutatedData.forEach((prod: any) => {
          prod["image"] = medicineImages[randint(0, medicineImages.length - 1)];
        });

        setProducts(mutatedData);
      })
      .catch((error) => {
        toastError(error);
      });
  }, []);

  return (
    <>
      <div className="mx-8 my-20 flex w-full flex-col items-center justify-center">
        <div className="mt-20 grid grid-cols-2 gap-x-16 gap-y-8">
          {products &&
            products.map((prod: any) => {
              return (
                <>
                  <Product product={prod} cart={cart} />
                </>
              );
            })}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        newestOnTop={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CustomerProductsPanel;
