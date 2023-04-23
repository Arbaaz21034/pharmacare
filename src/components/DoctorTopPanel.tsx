import Link from "next/link";

const DoctorTopPanel = (props: any) => {
  const { CTA, view } = props;

  return (
    <>
      <div className="mx-6 flex h-16 flex-row items-center">
        <div className="mr-auto">
          <Link href="/" className="text-lg font-semibold text-gray-700">
            Pharmacare
          </Link>
        </div>
        <div className="ml-auto"></div>
      </div>
      <div className="h-px w-full bg-gray-200"></div>
    </>
  );
};

export default DoctorTopPanel;
