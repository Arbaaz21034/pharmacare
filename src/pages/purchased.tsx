/* eslint-disable @next/next/no-img-element */
import PrescriptionsTopPanel from "../components/PrescriptionsTopPanel";

const Purchased = () => {
  return (
    <>
      <div className="bg-white">
        <PrescriptionsTopPanel />
        <div className="mt-40 flex flex-col items-center">
          <img src="/success.gif" alt="success" className="mb-8 h-48 w-48" />
          <h2 className="text-center text-5xl font-semibold text-gray-700">
            Thank you for your purchase!
          </h2>
        </div>
        <div className="h-100"></div>
      </div>
    </>
  );
};

export default Purchased;
