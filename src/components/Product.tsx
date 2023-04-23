/* eslint-disable @next/next/no-img-element */
const Product = (props: any) => {
  const { product, cart } = props;
  const currentCart = cart.cart;

  const modifyQuantity = (operation: 0 | 1) => {
    if (operation == 0) {
      cart.removeFromCart(product.m_id);
    } else if (operation == 1) {
      cart.addToCart(product.m_id);
    }
  };

  return (
    <>
      <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white shadow-xl duration-300 hover:scale-105 hover:shadow-lg dark:bg-slate-800">
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
          <div className="mt-6 flex items-center">
            <p className="mr-auto text-lg font-semibold text-gray-900 dark:text-zinc-200">
              ₹ {product.m_price}
            </p>
            <div className="ml-auto flex flex-col">
              <div className="text-center font-semibold text-gray-300">
                {currentCart[product.m_id]?.quantity || 0}
              </div>
              <div className="my-2 flex flex-row font-semibold text-gray-300">
                <button
                  className="rounded-l-2xl bg-neutral-500 px-3 transition duration-200 ease-out hover:cursor-pointer hover:bg-red-500"
                  onClick={() => modifyQuantity(0)}
                >
                  -
                </button>
                <div className="w-px"></div>
                <button
                  className="rounded-r-2xl bg-neutral-600 px-3 transition duration-200 ease-out hover:cursor-pointer hover:bg-green-500 "
                  onClick={() => modifyQuantity(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
