import { React, useEffect, useState } from "react";
import axios from "axios"
import { Loader } from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";



export const ViewDataDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:3000/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
    }, []);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        Bookid: id
    };

    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:3000/api/v1/add-book-to-favourite", {}, { headers });
        alert(response.data.messages);
    }

    const handleCart = async () => {
        const response = await axios.put("http://localhost:3000/api/v1/add-to-cart", {}, { headers });
        alert(response.data.messages);
    }

    const deleteBook = async () => {
        const res = await axios.delete("http://localhost:3000/api/v1/delete-book", { headers });
        alert(res.data.message)
        navigate("/all-books")
    }


    return (
        <>
            {Data && (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 gap-8 flex flex-col lg:flex-row items-start">

                    {/* Image Section */}
                    <div className="w-full lg:w-3/6">

                        <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12 ">
                            <img
                                src={Data.url}
                                alt={Data.title}
                                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded "
                            />
                            {isLoggedIn && role === "user" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">

                                    <button
                                        onClick={handleFavourite}
                                        className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex justify-center items-center"
                                    >
                                        <FaHeart />
                                        <span className="ms-4 block lg:hidden">Favourite</span>
                                    </button>

                                    <button
                                        onClick={handleCart}
                                        className="text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-blue-500 flex justify-center items-center"
                                    >
                                        <FaShoppingCart />
                                        <span className="ms-4 block lg:hidden">Add to Cart</span>
                                    </button>

                                </div>
                            )}
                            {isLoggedIn == true && role === "admin" && (
                                <div className="flex flex-col  md:flex-row lg:flex-col items-center justify-between lg:justify-start  mt-8 lg:mt-0">

                                    <Link to={`/updatebook/${id}`}  className="bg-white rounded lg:rounded-full text-3xl p-3   flex justify-center items-center"><FaEdit /><span className="ms-4 block lg:hidden">Edit</span>  </Link>

                                    <button className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt- md:mt-08lg:mt-8 bg-white flex justify-center items-center" onClick={deleteBook}><MdOutlineDeleteOutline /><span className="ms-4 block lg:hidden">Delete Book</span></button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-3xl md:text-4xl text-zinc-300 font-semibold">
                            {Data.title}
                        </h1>

                        <p className="text-zinc-400 mt-1">
                            by {Data.author}
                        </p>

                        <p className="text-zinc-400 mt-4 text-lg md:text-xl">
                            {Data.desc}
                        </p>

                        <p className="flex mt-4 items-center text-zinc-400">
                            <GrLanguage className="me-3" />
                            {Data.language}
                        </p>

                        <p className="mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold">
                            ₹ {Data.price}
                        </p>
                    </div>

                </div>
            )}

            {!Data && (
                <div className=" flex items-center justify-center h-screen bg-zinc-900 text-zinc-300"><Loader /> {" "}</div>
            )}
        </>
    )
}

