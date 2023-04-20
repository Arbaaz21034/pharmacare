const CustomerTopPanel = () => {
  return (
    <>
      <div className="mx-6 flex h-16 flex-row items-center">
        <div className="mr-auto">
          <h2 className="text-lg font-semibold text-gray-700">Pharmacare</h2>
        </div>
        <div className="ml-auto">
          <span className="text-gray-600 transition duration-300 ease-out hover:text-primary hover:underline">
            Your cart
          </span>
        </div>
      </div>
    </>
  );
};

export default CustomerTopPanel;
