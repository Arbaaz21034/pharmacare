import Link from "next/link";

const LoginForm = () => {
  return (
    <>
      <div className="box-border min-w-[360px] rounded-2xl  px-8 py-9 sm:min-w-[440px] sm:px-12 sm:shadow xl:min-w-[480px]">
        <div className="flex flex-col">
          <p className="font-medium text-gray-600">Email address</p>
          <input
            type="email"
            className="mt-3 h-10 rounded-lg border border-gray-300 px-2 text-gray-700 focus:outline-primary focus:invalid:outline-red-400"
            required
            autoComplete="on"
          />
        </div>
        <div className="mt-8 flex flex-col">
          <p className="font-medium text-gray-600">Password</p>
          <input
            type="password"
            className="mt-3 h-10 rounded-lg border border-gray-300 px-2 text-gray-700 focus:outline-primary"
            required
          />
        </div>
        <div className="mt-8 h-11 w-full">
          <button className="flex h-full w-full items-center justify-center rounded-lg bg-primary text-white transition-colors delay-100 ease-in hover:bg-primary-600">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
