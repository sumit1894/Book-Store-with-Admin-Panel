import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";


export const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
    ];
    const isLogIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLogIn === false) {
        links.splice(2, 2);
    }
    const [MobileView, setMobileView] = useState("hidden");
    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
                <Link to={"/"} className="flex items-center">
                    <img className="h-10 me-2" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                    <h1 className="text-2xl font-semibold">BookHeaven</h1>
                </Link>

                <div className="nav-links-bookheaven block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {
                            links.map((items, i) => (
                                <div className="flex items-center">
                                    {
                                        items.title === "Profile" ? (
                                            <Link to={items.link}
                                                className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300" key={i}>
                                                {items.title}
                                            </Link>
                                        ) : (
                                            <Link to={items.link}
                                                className="hover:text-blue-500 transition-all duration-300" key={i}>
                                                {items.title}{" "}
                                            </Link>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="hidden md:flex gap-4">
                        {
                            isLogIn === false && <>
                                <Link to="/login" className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">LogIn</Link>

                                <Link to="/signup" className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
                            </>
                        }
                    </div>
                    <button className=" block md:hidden text-white text-2xl hover:text-zinc-400" onClick={() => (
                        MobileView === "hidden" ? setMobileView("block") : setMobileView("hidden")
                    )}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            <div className={` ${MobileView} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center `}>
                {
                    links.map((items, i) => (
                        <Link to={items.link}
                            className={`${MobileView} text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`} key={i} onClick={() => (
                                MobileView === "hidden" ? setMobileView("block") : setMobileView("hidden")
                            )}>
                            {items.title}{" "}
                        </Link>
                    ))
                }


                {
                    isLogIn === false &&
                    <>
                        <Link to={"/login"}
                            className={`${MobileView} px-8 py-2 text-3xl mb-8 font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`} onClick={() => (
                                MobileView === "hidden" ? setMobileView("block") : setMobileView("hidden")
                            )}>LogIn</Link>

                        <Link to={"/signup"}
                            className={`${MobileView} px-8 py-2 text-3xl mb-8 font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`} onClick={() => (
                                MobileView === "hidden" ? setMobileView("block") : setMobileView("hidden")
                            )}>SignUp</Link>

                    </>

                }

            </div >
        </>

    )
}