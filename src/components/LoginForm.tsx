import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sleep } from "../utils/utils";
import { toastError, toastSuccess } from "../utils/misc";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2003/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!data.success) {
        toastError(data.message);
      } else if (data.success) {
        toastSuccess(data.message);
        sleep(2000).then(() => {
          if (data.loginAs == "admin") {
            router.push("/admin");
          } else if (data.loginAs == "doctor") {
            router.push("/doctor");
          } else {
            router.push("/customer");
          }
        });
      }
    } catch (error: any) {
      toastError(error.message);
    }
  };

  return (
    <>
      <div className="box-border min-w-[360px] rounded-2xl  bg-white px-8 py-16 sm:min-w-[440px] sm:px-12 sm:shadow-lg xl:min-w-[480px]">
        <div className="flex flex-col">
          <p className="font-medium text-gray-600">Email address</p>
          <input
            type="email"
            className="mt-3 h-10 rounded-lg border border-gray-300 px-2 text-gray-700 focus:outline-primary focus:invalid:outline-red-400"
            required
            autoComplete="on"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <p className="font-medium text-gray-600">Password</p>
          <input
            type="password"
            className="mt-3 h-10 rounded-lg border border-gray-300 px-2 text-gray-700 focus:outline-primary"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mt-8 h-12 w-full">
          <button
            className="flex h-full w-full items-center justify-center rounded-lg bg-primary font-semibold text-white transition-colors delay-100 ease-in hover:bg-primary-400"
            onClick={(e) => login(e)}
          >
            Sign in
          </button>
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
      </div>
    </>
  );
};

export default LoginForm;
