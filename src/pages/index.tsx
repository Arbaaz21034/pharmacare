import { type NextPage } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

const Home: NextPage = () => {
  return (
    <>
      <main className="bg-1 flex min-h-screen flex-col items-center justify-center">
        <LoginForm />
        <div className="mt-8">
          <Link className="text-gray-500 underline" href={"/sign-up"}>
            Register instead
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
