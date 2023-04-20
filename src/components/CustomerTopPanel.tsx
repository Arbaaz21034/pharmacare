import Link from "next/link";

const CustomerTopPanel = (props: CustomerTopPanelProps) => {
  const { CTA } = props;
  return (
    <>
      <div className="mx-6 flex h-16 flex-row items-center">
        <div className="mr-auto">
          <h2 className="text-lg font-semibold text-gray-700">Pharmacare</h2>
        </div>
        <div className="ml-auto">
          <Link
            href={CTA.link}
            className="text-gray-600 transition duration-300 ease-out hover:text-primary hover:underline"
          >
            {CTA.label}
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-gray-200"></div>
    </>
  );
};

interface CustomerTopPanelProps {
  CTA: {
    label: string;
    link: string;
  };
}

export default CustomerTopPanel;
