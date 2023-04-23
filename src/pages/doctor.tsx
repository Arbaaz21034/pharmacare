import React from "react";
import DoctorTopPanel from "../components/DoctorTopPanel";

export default function doctor() {
  return (
    <>
      <DoctorTopPanel />
      <div className="flex flex-col items-center">
        <div className="mt-28">
          <h3 className="mb-6 text-2xl font-semibold text-gray-700">
            Update Prescription
          </h3>
          <div className="h-px w-full bg-gray-300"></div>
          <div className="mt-12 w-100">
            <div>
              <label htmlFor="p_id" className="ml-1 text-sm text-gray-600">
                Prescription ID
              </label>
              <input
                id="p_id"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Medicine ID
              </label>
              <input
                id="m_id"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Medicine Quantity
              </label>
              <input
                id="m_quantity"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
              />
            </div>
            <div>
              <button className="mt-8 h-12 w-full rounded-lg bg-primary-500 text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
