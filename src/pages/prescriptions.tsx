import { useEffect, useState } from "react";
import PrescriptionsTopPanel from "../components/PrescriptionsTopPanel";
import Cookies from "universal-cookie";
import { LoadingAnimatedIcon } from "../utils/icons";

// NOTE: This code is super unsafe and only meant for demo purposes
// please do not use this in production ever.

const Prescription = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [prescriptions, setPrescriptions] = useState<any>([]);
  const [fetchPrescriptions, setFetchPrescriptions] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const nameInCookie = cookies.get("userName");
    const userIdInCookie = cookies.get("userId");
    console.log(nameInCookie);
    setName(nameInCookie);
    setUserId(userIdInCookie);
    console.log(name);
    console.log(userId);

    const getUser = async () => {
      const res = await fetch("http://localhost:2003/api/user");
      const data = await res.json();
      console.log(data);
    };

    const getPrescriptions = async () => {
      console.log("Attempt fetching prescriptions");
      const params = new URLSearchParams();
      params.set("u_id", cookies.get("userId"));
      const url = `http://localhost:2003/api/prescription?${params.toString()}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      if (data.success == true) {
        setPrescriptions(data.data);
        setFetchPrescriptions(true);
        console.log(data);
      }
    };

    getPrescriptions();
  }, []);

  return (
    <>
      <PrescriptionsTopPanel />
      <div className="mx-8 mt-8">
        <div className="mb-16">
          Welcome back, <span className="font-semibold">{name}.</span>
        </div>
        <h1 className="text-4xl font-semibold text-gray-700">
          Your Prescriptions
        </h1>
        <div className="mt-24">
          {!fetchPrescriptions && (
            <LoadingAnimatedIcon className={"h-16 w-16 stroke-primary"} />
          )}
          {fetchPrescriptions && prescriptions.length > 0 && (
            <>
              <div></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Prescription;
