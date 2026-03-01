import axios from "axios";
import React, { useEffect, useState } from "react"
import { BookCard } from "../BookCard/bookcard";

export const Favourites = () => {

    const [favouriteBook, setFavouriteBooks] = useState([]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/get-favourite-books",
                    { headers }
                );
                setFavouriteBooks(response.data.data);
            } catch (error) {
                console.log("error-try", error);
            }
        };

        fetch();
    }, []);

    return (
        <>
            {/* Empty State */}
            {favouriteBook && favouriteBook.length === 0 && (
                <div className="text-5xl font-semibold h-[100vh] text-zinc-500 flex items-center justify-center flex-col w-full">
                    No Favourite Books
                    {/* <img src="/star.png" alt="star" className="h-[20vh] my-8" /> */}
                </div>
            )}

            {/* Grid Section */}
            <div className="grid grid-cols-3 gap-4">
                {favouriteBook &&
                    favouriteBook.map((item) => (
                        <div key={item._id}>
                            <BookCard data={item} Favourites={true} />
                        </div>
                    ))}
            </div>
        </>
    );
}