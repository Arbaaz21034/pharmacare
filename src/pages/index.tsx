import { type NextPage } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

const Home: NextPage = () => {
  return (
    <>
      <main className="bg-1 flex min-h-screen flex-col items-center justify-center">
        <LoginForm />
      </main>
    </>
  );
};

export default Home;
