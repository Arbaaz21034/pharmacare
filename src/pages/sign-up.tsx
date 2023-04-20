import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <>
      <main className="bg-1 flex min-h-screen flex-col items-center justify-center">
        <SignUpForm />
        <div className="mt-8">
          <Link className="text-gray-500 underline" href={"/"}>
            Login instead
          </Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
