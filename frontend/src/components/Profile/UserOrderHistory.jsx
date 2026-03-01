import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";

export const UserOrderHistory = () => {

  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/get-order-history",
          { headers }
        );

        setOrderHistory(res.data.data || []);
      } catch (error) {
        console.log("Order History Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 md:p-12">

      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-300">
        Your Order History
      </h1>

      {/* Empty State */}
      {orderHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-3xl text-zinc-400">
            No Orders Yet
          </h2>
        </div>
      )}

      {/* Orders Table */}
      {orderHistory.length > 0 && (
        <div className="overflow-x-auto">

          {/* Header */}
          <div className="grid grid-cols-6 bg-zinc-800 p-4 rounded-t-lg text-lg font-semibold text-zinc-300">
            <div>Sr.</div>
            <div>Book</div>
            <div>Description</div>
            <div>Price</div>
            <div>Status</div>
            <div>Mode</div>
          </div>

          {/* Rows */}
          {orderHistory
            .filter(item => item.book)   // 👈 Prevent crash if book deleted
            .map((item, i) => (
              <div
                key={item._id}
                className="grid grid-cols-6 bg-zinc-800 p-4 border-t border-zinc-700 hover:bg-zinc-700 transition"
              >
                <div>{i + 1}</div>

                <div>
                  <Link
                    to={`/view-book-details/${item.book?._id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {item.book?.title}
                  </Link>
                </div>

                <div className="truncate">
                  {item.book?.description?.slice(0, 50)}...
                </div>

                <div>₹ {item.book?.price}</div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${item.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : item.status === "Cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>COD</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};