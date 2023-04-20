import React, { useState } from "react";
import Select from "react-select";
import Button from "../components/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  medicineImages,
  randint,
  toastError,
  toastSuccess,
} from "../utils/misc";
import Product from "../components/Product";
import CustomerTopPanel from "../components/CustomerTopPanel";

const Customer = () => {
  const [products, setProducts] = useState([]);
  const [selectValue, setSelectValue] = useState(null);

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

  const fetchProducts = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    fetch("http://localhost:2003/api/products/" + selectValue)
      .then((res) => res.json())
      .then((data) => {
        const mutatedData = data.products;
        mutatedData.forEach((prod: any) => {
          prod["image"] = medicineImages[randint(0, medicineImages.length - 1)];
        });

        setProducts(mutatedData);
        toastSuccess("Fetched the requested products");
      })
      .catch((error) => {
        toastError(error);
      });
  };

  function handleSelect(selectedOption: any) {
    setSelectValue(selectedOption.value);
  }

  return (
    <>
      <CustomerTopPanel CTA={{ link: "/cart", label: "Your cart" }} />
      <div className="mx-8 my-20 flex w-full flex-col items-center justify-center">
        <div className="flex w-100 flex-row items-center justify-center gap-x-8">
          <Select options={selectOptions} onChange={handleSelect} />
          <Button variant="default" size="md" onClick={(e) => fetchProducts(e)}>
            Fetch medicines
          </Button>
        </div>

        <div className="mt-40 grid grid-cols-2 gap-x-16 gap-y-8">
          {products &&
            products.map((prod: any) => {
              return (
                <>
                  <Product product={prod} />
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

export default Customer;
