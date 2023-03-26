/* eslint-disable @next/next/no-img-element */
const Product = (props: any) => {
  const { product } = props;

  return (
    <>
      <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg dark:bg-slate-800">
        <img
          className="h-48 w-full object-cover object-center"
          src={product.image}
          alt="Medicine image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            {product.m_name}
          </h2>
          <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
            {product.m_stock} in stock
          </p>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
              {product.m_price} INR
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
