import { toastError, toastSuccess } from "../utils/misc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrescriptionCard = (props: any) => {
  const { prescription, pid } = props;
  const cost = prescription.reduce((acc: any, medicine: any) => {
    return acc + medicine.m_price * medicine.m_quantity;
  }, 0);

  const buyPrescription = async (e: any) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("p_id", pid);
    const url = `http://localhost:2003/api/transaction/3?${params.toString()}`;
    console.log(url);

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.success == true) {
      toastSuccess("Prescription bought");
      await new Promise((resolve) => setTimeout(resolve, 4000));
      window.location.href = "/customer";
    } else {
      toastError(data.message);
    }
  };

  return (
    <>
      <div className="w-100 rounded-2xl border bg-white">
        <div className="mx-10 my-10">
          <div className="mb-12">
            <span className="text-xl font-semibold text-gray-700">
              Prescription
            </span>
          </div>
          <div>
            {prescription.map((medicine: any) => {
              return (
                <div key={medicine.m_id} className="text-gray-500">
                  {medicine.m_name} (x{medicine.m_quantity}, ${medicine.m_price}
                  )
                </div>
              );
            })}
            <div className="mt-6 font-semibold text-gray-700">
              Prescription cost: <span className="font-semibold">${cost}</span>
            </div>
            <div className="mt-12">
              <button
                className="w-full rounded-lg bg-primary-500 py-3 text-white hover:bg-primary-400"
                onClick={(e) => buyPrescription(e)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PrescriptionCard;
