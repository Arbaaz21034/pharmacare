import React from "react";
import Select from "react-select";
import Button from "../components/Button";

const Customer = () => {
  const selectOptions = [
    { value: "pain relief", label: "Pain relief" },
    { value: "allergy relief", label: "Allergy" },
    { value: "cholesterol ", label: "Cholesterol" },
    { value: "diabetes", label: "Diabetes" },
    { value: "blood pressure", label: "Blood Pressure" },
    { value: "antibiotics", label: "Antibiotics" },
    { value: "acid reflux", label: "Acid Reflux" },
    { value: "cold and flu", label: "Cold & Flu" },
    { value: "digestive", label: "Digestive" },
  ];

  return (
    <>
      <div className="mx-8 mt-20 flex items-center justify-center">
        <div className="">
          <div className="flex flex-row items-center justify-center gap-x-8">
            <Select options={selectOptions} />
            <Button variant="default" size="md">
              Fetch medicines
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
