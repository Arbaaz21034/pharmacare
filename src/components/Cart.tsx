import React from "react";

const Cart = (props: any) => {
  const cart = props.cart;
  const [products, setProducts] = React.useState<any>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetch("http://localhost:2003/api/products/all")
      .then((res) => res.json())
      .then((data) => {
        const mutatedData = data.products;
        setProducts(mutatedData);
        console.log("setting total", mutatedData);
        setTotal(
          cart.cart.reduce((acc: any, item: any) => {
            const price = mutatedData.find(
              (product: any) => product.m_id == item.id
            ).m_price;
            return acc + price * item.quantity;
          }, 0)
        );
      });
  }, []);

  return (
    <>
      <div className="mt-12">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-semibold text-gray-700">Your cart</h1>
        </div>
        <div className="mx-8 grid min-h-[720px] grid-cols-8 gap-x-6">
          <div className="col-span-5 rounded-2xl border bg-white shadow-sm">
            <div className="mx-6 mt-8 text-gray-600">
              {products.length > 0 &&
                cart.cart.map((item: any) => {
                  if (products) {
                    const itemName = products.find(
                      (product: any) => product.m_id == item.id
                    ).m_name;
                    if (item.quantity > 0) {
                      return (
                        <div key={item.id} className="mb-2">
                          {itemName} (quantity: {item.quantity})
                        </div>
                      );
                    }
                  }
                })}
              {cart.cart.length == 0 && (
                <div className="text-center text-xl">Cart is empty</div>
              )}
            </div>
          </div>
          <div className="col-span-3 rounded-2xl border bg-white shadow-sm">
            <div className="mx-6 mt-8">
              <span className="font-semibold text-gray-700">
                {total == 0 && <span>Order total: $0</span>}
                {total != 0 && <span>Order total: ${total}</span>}
              </span>
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
