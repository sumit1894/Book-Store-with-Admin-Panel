import React from "react";
import { RxCross1 } from "react-icons/rx";

export const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <div
      className={`${userDiv} inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50`}
    >
      {/* Modal Box */}
      <div className="bg-zinc-900 text-white w-[90%] md:w-[400px] rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-700 pb-3 mb-4">
          <h1 className="text-xl font-bold tracking-wide">
            User Information
          </h1>
          <button
            onClick={() => setuserDiv("hidden")}
            className="p-2 hover:bg-zinc-800 rounded-full transition"
          >
            <RxCross1 size={18} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-4 text-sm">

          <div className="bg-zinc-800 p-3 rounded-lg">
            <span className="text-gray-400">username</span>
            <p className="font-semibold text-white mt-1">
              {userDivData?.username}
            </p>
          </div>

          <div className="bg-zinc-800 p-3 rounded-lg">
            <span className="text-gray-400">Email</span>
            <p className="font-semibold text-white mt-1">
              {userDivData?.email}
            </p>
          </div>

          <div className="bg-zinc-800 p-3 rounded-lg">
            <span className="text-gray-400">Address</span>
            <p className="font-semibold text-white mt-1">
              {userDivData?.address}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};