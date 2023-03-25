import { type NextPage } from "next";
import LoginForm from "../components/LoginForm";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center">
        <LoginForm />
      </main>
    </>
  );
};

export default Home;
