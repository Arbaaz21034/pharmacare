import { useState } from "react";
import Button from "../components/Button";
import ButtonAlt from "../components/ButtonAlt";

const Admin = () => {
  const [viewReport, setViewReport] = useState(0);

  const report = (id: number) => {
    setViewReport(id);
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
        <div className="pt-60">{viewReport != 0 && <>{viewReport}</>}</div>
      </div>
    </>
  );
};

export default Admin;
