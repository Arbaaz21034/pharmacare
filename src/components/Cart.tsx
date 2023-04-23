const Cart = (props: any) => {
  const cart = props.cart;

  return (
    <>
      <div className="mt-12">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-semibold text-gray-700">Your cart</h1>
        </div>
        <div className="mx-8 grid min-h-[720px] grid-cols-8 gap-x-6">
          <div className="col-span-5 rounded-2xl border bg-white shadow-sm">
            <div className="mx-6 mt-8 text-gray-600">
              {cart.cart.map((item: any) => {
                if (item.quantity > 0) {
                  return (
                    <div key={item.id}>
                      {item.id} (quantity: {item.quantity})
                    </div>
                  );
                }
              })}
              {cart.cart.length == 0 && (
                <div className="text-center text-xl">Cart is empty</div>
              )}
            </div>
          </div>
          <div className="col-span-3 rounded-2xl border bg-white shadow-sm">
            <div className="mx-6 mt-8">
              <span className="font-semibold text-gray-700">Order total: </span>
              <div className="mt-100">
                <button className="w-full rounded-lg bg-primary-500 py-3 text-white">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
