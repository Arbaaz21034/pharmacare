import { type NextPage } from "next";
import LoginForm from "../components/LoginForm";

const Home: NextPage = () => {
  return (
    <>
      <main className="bg-1 flex min-h-screen items-center justify-center">
        <LoginForm />
      </main>
    </>
  );
};

export default Home;
