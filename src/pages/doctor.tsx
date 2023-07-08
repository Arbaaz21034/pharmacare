import React, { useRef, useState } from "react";
import DoctorTopPanel from "../components/DoctorTopPanel";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../utils/misc";
import { ToastContainer } from "react-toastify";

const Doctor = () => {
  const [pid, setPid] = useState("");
  const [mid, setMid] = useState("");
  const [medQuantity, setMedQuantity] = useState("");

  const pidRef = useRef<HTMLInputElement>(null);
  const midRef = useRef<HTMLInputElement>(null);
  const medQuantityRef = useRef<HTMLInputElement>(null);

  const updateEvent = async (e: any) => {
    console.log("Run updateEvent");
    e.preventDefault();

    if (pid == "" || mid == "" || medQuantity == "") {
      toastError("Please fill all the fields");
      return;
    }

    if (parseInt(pid) < 0 || isNaN(parseInt(pid))) {
      toastError("Please enter a valid prescription ID");
      return;
    }

    if (parseInt(mid) < 0 || isNaN(parseInt(mid))) {
      toastError("Please enter a valid medicine ID");
      return;
    }

    if (parseInt(medQuantity) < 0 || isNaN(parseInt(medQuantity))) {
      toastError("Please enter a valid medicine quantity");
      return;
    }

    const params = new URLSearchParams();
    params.set("p_id", pid);
    params.set("m_id", mid);
    params.set("m_quantity", medQuantity);

    const url =
      process.env.NEXT_PUBLIC_SERVER_URL +
      `/api/transaction/2${params.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.success == true) {
      toastSuccess("Sent medicine update request");
    } else {
      toastError(data.message);
    }

    setPid("");
    setMid("");
    setMedQuantity("");

    if (pidRef.current) pidRef.current.value = "";
    if (midRef.current) midRef.current.value = "";
    if (medQuantityRef.current) medQuantityRef.current.value = "";
  };

  return (
    <>
      <DoctorTopPanel />
      <div className="flex flex-col items-center">
        <div className="mt-28">
          <h3 className="mb-6 text-2xl font-semibold text-gray-600">
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
                onChange={(event) => setPid(event.target.value)}
                placeholder="1"
                ref={pidRef}
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
                onChange={(event) => setMid(event.target.value)}
                placeholder="244"
                ref={midRef}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Medicine Quantity (New)
              </label>
              <input
                id="m_quantity"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
                onChange={(event) => setMedQuantity(event.target.value)}
                placeholder="5"
                ref={medQuantityRef}
              />
            </div>
            <div>
              <button
                className="mt-8 h-12 w-full rounded-lg bg-primary-500 text-white hover:cursor-pointer hover:bg-primary-400"
                onClick={(e) => updateEvent(e)}
              >
                Update Prescription
              </button>
            </div>
          </div>
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

export default Doctor;
