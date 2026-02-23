import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      if (formData.username === "" || formData.email === "" || formData.password === "" || formData.address === "") {
        alert("All fileds are required")
      } else {
        const response = await axios.post("http://localhost:3000/api/v1/sign-up", formData);
        alert(response.data.message)
        navigate("/login")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-zinc-900 px-4">

      {/* Card */}
      <div className=" mt-5 mb-5 bg-zinc-800 w-full max-w-md rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-semibold text-zinc-200 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-zinc-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-zinc-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="xyz@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-zinc-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-zinc-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-zinc-400 mb-1">Address</label>
            <textarea
              name="address"
              placeholder="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-zinc-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-300 " onClick={submit}
          >
            SignUp
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-zinc-600"></div>
          <span className="px-3 text-zinc-400 text-sm">Or</span>
          <div className="flex-1 h-px bg-zinc-600"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            LogIn
          </Link>
        </p>

      </div>
    </div>
  );
};
