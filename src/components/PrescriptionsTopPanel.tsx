import Link from "next/link";

const PrescriptionsTopPanel = () => {
  return (
    <>
      <div className="mx-6 flex h-16 flex-row items-center">
        <div className="mr-auto">
          <Link href="/" className="text-lg font-semibold text-gray-700">
            Pharmacare
          </Link>
        </div>
        <div className="ml-auto">
          <Link
            className="text-gray-600 transition duration-300 ease-out hover:cursor-pointer hover:text-primary hover:underline"
            href={"/customer"}
          >
            Browse products
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-gray-200"></div>
    </>
  );
};

export default PrescriptionsTopPanel;
