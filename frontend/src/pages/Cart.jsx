import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { Loader } from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);  // MUST be array
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔹 Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-cart-book",
          { headers }
        );

        setCart(response.data.data || []);
      } catch (error) {
        console.log("Cart Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 🔹 Calculate Total
  useEffect(() => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  // 🔹 Delete Item
  const deleteItem = async (bookid) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );

      // Optimistic update
      setCart((prev) => prev.filter((item) => item._id !== bookid));

    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // 🔹 Place Order
  const placeOrder = async () => {
    try {
      const bookIds = cart.map((item) => item._id);

      const res = await axios.post(
        "http://localhost:3000/api/v1/place-order",
        { order: bookIds },
        { headers }
      );

      alert(res.data.message);

      setCart([]); // clear UI
      navigate("/profile/orderHistory");

    } catch (error) {
      console.log("Order Error:", error.response?.data || error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="px-4 md:px-12 py-8">

      {cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="text-5xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>

          {cart.map((item) => (
            <div
              key={item._id}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />

              <div className="w-full md:w-auto mt-2 md:mt-0">
                <h1 className="text-2xl text-zinc-100 font-semibold">
                  {item.title}
                </h1>

                <p className="text-zinc-300 mt-2 hidden lg:block">
                  {item.desc?.slice(0, 100) || item.description?.slice(0, 100)}...
                </p>

                <p className="text-zinc-300 mt-2 lg:hidden">
                  {item.desc?.slice(0, 100) || item.description?.slice(0, 100)}...
                </p>
              </div>

              <div className="flex mt-4 md:mt-0 items-center gap-4">
                <h2 className="text-zinc-100 text-3xl font-semibold">
                  ₹ {item.price}
                </h2>

                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded w-full md:w-[30%]">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>

              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{cart.length} books</h2>
                <h2>₹ {total}</h2>
              </div>

              <div className="w-full mt-3">
                <button
                  className="bg-zinc-100 rounded px-4 py-2 w-full font-semibold hover:bg-zinc-200"
                  onClick={placeOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};