import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sleep } from "../utils/utils";
import { toastError, toastSuccess } from "../utils/misc";

const SignUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const login = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="min-w-[360px] rounded-2xl border border-gray-200  bg-white px-8 py-16 sm:min-w-[440px] sm:px-12 sm:shadow-lg xl:min-w-[480px]">
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
          <p className="font-medium text-gray-600">New Password</p>
          <input
            type="password"
            className="mt-3 h-10 rounded-lg border border-gray-300 px-2 text-gray-700 focus:outline-primary"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <p className="font-medium text-gray-600">Confirm Password</p>
          <input
            type="password"
            className="mt-3 h-10 rounded-lg border border-gray-300 px-2 text-gray-700 focus:outline-primary"
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="mt-8 h-12 w-full">
          <button
            className="flex h-full w-full items-center justify-center rounded-lg bg-primary font-semibold text-white transition-colors delay-100 ease-in hover:bg-primary-400"
            onClick={(e) => login(e)}
          >
            Create account
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

export default SignUpForm;
