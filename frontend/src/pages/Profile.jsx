import React, { useEffect, useState } from "react";
import { Slidebar } from "../components/Profile/Slidebar";
import { Outlet } from "react-router-dom"
import axios from "axios"
import { Loader } from "../components/Loader/Loader";
import { MobileNav } from "../components/Profile/MobileNav";

export const Profile = () => {
    const [Profile, setProfile] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/get-user-information", { headers });
            setProfile(response.data);
        }
        fetch()
    }, [])

    return (
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-4 text-white">
            {!Profile && <div className=" flex items-center justify-center h-screen w-screen"><Loader /> {" "}</div>}
            {Profile && <>
                <div className=" w-full md:w-1/6">
                    <Slidebar data={Profile} />
                    <MobileNav/>
                </div>
                <div className="w-full md:w-5/6">
                    <Outlet />
                </div>
            </>}
        </div>
    )
}