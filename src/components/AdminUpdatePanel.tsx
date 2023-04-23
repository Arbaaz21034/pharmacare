const AdminUpdatePanel = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="my-28">
          <h3 className="mb-6 text-2xl font-semibold text-gray-700">
            Update Medicine
          </h3>
          <div className="h-px w-full bg-gray-300"></div>
          <div className="mt-12 w-100">
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Medicine ID
              </label>
              <input
                id="m_id"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Medicine Stock
              </label>
              <input
                id="m_stock"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="m_id" className="ml-1 text-sm text-gray-600">
                Medicine Price
              </label>
              <input
                id="m_price"
                type="text"
                className="h-12 w-full rounded-lg border px-4"
              />
            </div>
            <div>
              <button className="mt-8 h-12 w-full rounded-lg bg-primary-500 text-white">
                Update medicine
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUpdatePanel;
