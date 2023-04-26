import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../utils/misc";

const AdminUpdatePanel = () => {
  const [pid, setPid] = useState("");
  const [mstock, setMstock] = useState("");
  const [mprice, setMprice] = useState("");

  const pidRef = useRef<HTMLInputElement>(null);
  const mstockRef = useRef<HTMLInputElement>(null);
  const mpriceRef = useRef<HTMLInputElement>(null);

  const updateEvent = async (e: any) => {
    console.log("Run updateEvent");
    e.preventDefault();

    if (pid == "" || mstock == "" || mprice == "") {
      toastError("Please fill all the fields");
      return;
    }

    const params = new URLSearchParams();
    params.set("p_id", pid);
    params.set("stock_inc", mstock);
    params.set("price_inc", mprice);

    // http://localhost:2003/api/transaction/2?p_id=1&m_id=244&m_quantity=5

    const url = `http://localhost:2003/api/transaction/1?${params.toString()}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.success == true) {
      toastSuccess("Sent medicine update request");
    } else {
      toastError(data.message);
    }

    setPid("");
    setMstock("");
    setMprice("");

    if (pidRef.current) pidRef.current.value = "";
    if (mstockRef.current) mstockRef.current.value = "";
    if (mpriceRef.current) mpriceRef.current.value = "";
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="my-28">
          <h3 className="mb-6 text-2xl font-semibold text-gray-700">
            Update Medicine in Prescription
          </h3>
          <div className="h-px w-full bg-gray-300"></div>
          <div className="mt-8 w-100">
            <div className="mt-8">
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
                Increase Medicine Stock by
              </label>
              <input
                id="m_stock"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
                onChange={(event) => setMstock(event.target.value)}
                placeholder="25"
                ref={mstockRef}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Increase in Medicine Price (in %)
              </label>
              <input
                id="m_price"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
                onChange={(event) => setMprice(event.target.value)}
                placeholder="5%"
                ref={mpriceRef}
              />
            </div>
            <div>
              <button
                className="mt-8 h-12 w-full rounded-lg bg-primary-500 text-white hover:cursor-pointer hover:bg-primary-400"
                onClick={(e) => updateEvent(e)}
              >
                Update medicine
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

export default AdminUpdatePanel;
