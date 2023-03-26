import { useState } from "react";
import ButtonAlt from "../components/ButtonAlt";
import { v4 as uuidv4 } from "uuid";

const Admin = () => {
  const [viewReport, setViewReport] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const report = async (id: number) => {
    setViewReport(id);
    const response = await fetch("http://localhost:2003/api/report/" + id);
    const fetchData = await response.json();
    console.log(fetchData);
    setData(fetchData.data);
  };

  const showData = () => {
    if (viewReport == 1 && data != null && data != undefined) {
    } else if (viewReport == 3 && data != null && data != undefined) {
      if (data[0]?.revenue) {
        return (
          <div className="flex w-200 items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-x-6">
              <div className="flex flex-col items-center rounded-2xl bg-neutral-700 px-4 py-10 shadow-xl">
                <h2 className="text-lg text-gray-300">Normal Revenue</h2>
                <p className="pt-8 text-2xl font-semibold text-gray-200">
                  ₹ {data[0].revenue}
                </p>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-neutral-700 px-4 py-10 shadow-xl">
                <h2 className="text-lg text-gray-300">VIP Revenue</h2>
                <p className="pt-8 text-2xl font-semibold text-gray-200">
                  ₹ {data[1].revenue}
                </p>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-neutral-700 px-4 py-10 shadow-xl">
                <h2 className="text-lg text-gray-300">Total Revenue</h2>
                <p className="pt-8 text-2xl font-semibold text-gray-200">
                  ₹ {data[2].revenue}
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else if (viewReport == 4 && data != null && data != undefined) {
      if (data[0]?.c_id) {
        return (
          <div className="flex w-200 items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-x-6 gap-y-10">
              {data.map((c) => {
                return (
                  <div
                    key={uuidv4()}
                    className="flex flex-col items-center rounded-2xl bg-neutral-700 px-4 py-10 shadow-xl"
                  >
                    <h2 className="text-lg text-gray-300">
                      {c.month ? c.month : "Total revenue"}
                    </h2>
                    <p className="pt-6 text-sm text-slate-300">
                      Customer {c.c_id}
                    </p>
                    <p className="pt-8 text-3xl font-semibold text-gray-200">
                      ₹ {c.revenue}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="mx-8 mt-32 flex w-full flex-col items-center justify-center">
        <div className="min-w-100 flex flex-row items-center justify-center gap-x-10">
          <ButtonAlt onClick={() => report(1)} view={viewReport} bid={1}>
            Report 1
          </ButtonAlt>
          <ButtonAlt onClick={() => report(2)} view={viewReport} bid={2}>
            Report 2
          </ButtonAlt>
          <ButtonAlt onClick={() => report(3)} view={viewReport} bid={3}>
            Report 3
          </ButtonAlt>
          <ButtonAlt onClick={() => report(4)} view={viewReport} bid={4}>
            Report 4
          </ButtonAlt>
        </div>
        <div className="pt-60">
          {viewReport != 0 && data != null && <>{showData()}</>}
        </div>
      </div>
    </>
  );
};

export default Admin;
