import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

const CustomerTopPanel = (props: CustomerTopPanelProps) => {
  const { CTA, view } = props;

  const switchView = () => {
    if (view.viewMode == "products") {
      view.setViewMode("cart");
    }
    if (view.viewMode == "cart") {
      view.setViewMode("products");
    }
  };

  return (
    <>
      <div className="mx-6 flex h-16 flex-row items-center">
        <div className="mr-auto">
          <Link href="/" className="text-lg font-semibold text-gray-700">
            Pharmacare
          </Link>
        </div>
        <div className="ml-auto">
          <span
            className="text-gray-600 transition duration-300 ease-out hover:cursor-pointer hover:text-primary hover:underline"
            onClick={() => switchView()}
          >
            {CTA.label}
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-gray-200"></div>
    </>
  );
};

interface CustomerTopPanelProps {
  CTA: {
    label: string;
  };
  view: {
    viewMode: string;
    setViewMode: Dispatch<SetStateAction<string>>;
  };
}

export default CustomerTopPanel;
