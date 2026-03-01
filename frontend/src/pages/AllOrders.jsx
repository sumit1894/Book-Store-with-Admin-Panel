import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { SeeUserData } from "./SeeUserData";

export const AllOrder = () => {
    const [AllOrders, setAllOrders] = useState(null);
    const [Options, setOptions] = useState(-1);
    const [values, setValues] = useState({});
    const [updating, setUpdating] = useState(false);
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Fetch Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/v1/get-all-orders",
                    { headers }
                );
                setAllOrders(res.data.data);
            } catch (error) {
                console.error(error.response?.data?.message);
            }
        };

        fetchOrders();
    }, []);

    // Handle Dropdown Change
    const change = (e, i) => {
        setValues((prev) => ({
            ...prev,
            [i]: e.target.value,
        }));
    };

    // Submit Status Update
    const submitChanges = async (i) => {
        try {
            setUpdating(true);

            const id = AllOrders[i]._id;
            const newStatus = values[i] || AllOrders[i].status;

            const response = await axios.put(
                `http://localhost:3000/api/v1/update-status/${id}`,
                { status: newStatus },
                { headers }
            );

            alert(response.data.messages);

            // Instant UI Update
            setAllOrders((prev) =>
                prev.map((order, index) =>
                    index === i ? { ...order, status: newStatus } : order
                )
            );

            setOptions(-1);
        } catch (error) {
            console.error(error.response?.data?.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6 md:p-10 relative">
            {/* Loader */}
            {!AllOrders && (
                <div className="flex justify-center items-center h-[60vh]">
                    <Loader />
                </div>
            )}

            {/* Orders Table */}
            {AllOrders && AllOrders.length > 0 && (
                <div className="overflow-x-auto rounded-xl shadow-lg">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-6 bg-zinc-800 p-4 text-sm font-semibold text-gray-400 uppercase tracking-wider rounded-t-xl">
                        <div>Sr</div>
                        <div>Book</div>
                        <div>Description</div>
                        <div>Price</div>
                        <div>Status</div>
                        <div className="text-center">Action</div>
                    </div>

                    {/* Orders */}
                    {AllOrders.map((item, i) => (
                        <div
                            key={item._id}
                            className="grid md:grid-cols-6 gap-4 bg-zinc-800 p-4 border-t border-zinc-700 hover:bg-zinc-700 transition duration-300 items-center"
                        >
                            {/* Sr */}
                            <div className="font-medium">{i + 1}</div>

                            {/* Book */}
                            <div>
                                <Link
                                    to={`/view-book-details/${item.book?._id}`}
                                    className="text-blue-400 hover:underline"
                                >
                                    {item.book?.title}
                                </Link>
                            </div>

                            {/* Description */}
                            <div className="text-gray-400 text-sm truncate">
                                {item.book?.desc?.slice(0, 50)}...
                            </div>

                            {/* Price */}
                            <div className="font-semibold text-green-400">
                                ₹ {item.book?.price}
                            </div>

                            {/* Status */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setOptions(i)}
                                    className={`w-fit px-4 py-1.5 rounded-full text-xs font-semibold transition ${item.status === "Delivered"
                                            ? "bg-green-500"
                                            : item.status === "Canceled"
                                                ? "bg-red-500"
                                                : item.status === "Out for Delivery"
                                                    ? "bg-blue-500"
                                                    : "bg-yellow-500 text-black"
                                        }`}
                                >
                                    {item.status}
                                </button>

                                {Options === i && (
                                    <div className="flex items-center gap-3">
                                        <select
                                            onChange={(e) => change(e, i)}
                                            value={values[i] || item.status}
                                            className="bg-zinc-900 border border-zinc-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {[
                                                "Order placed",
                                                "Out for Delivery",
                                                "Delivered",
                                                "Canceled",
                                            ].map((status, index) => (
                                                <option key={index} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            onClick={() => submitChanges(i)}
                                            disabled={updating}
                                            className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition disabled:opacity-50"
                                        >
                                            <FaCheck size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* View User */}
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition"
                                    onClick={() => {
                                        setuserDiv("fixed");
                                        setuserDivData(item.user);
                                        console.log(item.user)
                                    }}
                                >
                                    <IoOpenOutline size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Orders */}
            {AllOrders && AllOrders.length === 0 && (
                <div className="text-center mt-20 text-gray-400 text-xl">
                    No Orders Found
                </div>
            )}

            {/* User Modal */}
            {userDivData && (
                <SeeUserData
                    userDivData={userDivData}
                    userDiv={userDiv}
                    setuserDiv={setuserDiv}
                />
            )}
        </div>
    );
};