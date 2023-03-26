import React, { useState } from "react";
import Select from "react-select";
import Button from "../components/Button";
import { ToastContainer } from "react-toastify";
import { toastError } from "../utils/misc";

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
      .then((data) => setProducts(data.products))
      .catch((error) => toastError(error));
  };

  function handleSelect(selectedOption: any) {
    setSelectValue(selectedOption.value);
  }

  return (
    <>
      <div className="mx-8 mt-20 flex items-center justify-center">
        <div className="flex w-100 flex-row items-center justify-center gap-x-8">
          <Select options={selectOptions} onChange={handleSelect} />
          <Button variant="default" size="md" onClick={(e) => fetchProducts(e)}>
            Fetch medicines
          </Button>
        </div>

        <div className="mt-80 grid grid-cols-2">
          {products &&
            products.map((prod: any) => {
              return (
                <>
                  <div>{prod.m_name}</div>
                </>
              );
            })}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
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
