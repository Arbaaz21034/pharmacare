const Cart = (props: any) => {
  const cart = props.cart;
  return (
    <>
      <div className="mt-12">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-semibold text-gray-700">Your cart</h1>
        </div>
        <div className="mx-8 grid min-h-[720px] grid-cols-8 gap-x-6">
          <div className="col-span-5 rounded-2xl border bg-white shadow-sm"></div>
          <div className="col-span-3 rounded-2xl border bg-white shadow-sm"></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
