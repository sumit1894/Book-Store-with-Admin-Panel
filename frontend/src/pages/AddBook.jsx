import axios from "axios";
import React, { useState } from "react";

export const AddBook = () => {
  const [form, setForm] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      if (
        form.url === "" ||
        form.title === "" ||
        form.author === "" ||
        form.price === "" ||
        form.description === "" ||
        form.language === ""
      ) {
        alert("All fields are required");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/v1/add-book",
        form,
        { headers }
      );

      setForm({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
      });

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit();
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1a1d26] rounded-2xl shadow-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white mb-2">Add Book</h2>

        <div>
          <label className="text-gray-300 text-sm">Image</label>
          <input
            type="text"
            name="url"
            placeholder="url of image"
            value={form.url}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-[#0f1117] text-white outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm">Title of book</label>
          <input
            type="text"
            name="title"
            placeholder="title of book"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-[#0f1117] text-white outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm">Author of book</label>
          <input
            type="text"
            name="author"
            placeholder="author of book"
            value={form.author}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-[#0f1117] text-white outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-300 text-sm">Language</label>
            <input
              type="text"
              name="language"
              placeholder="language of book"
              value={form.language}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-[#0f1117] text-white outline-none border border-gray-700 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Price</label>
            <input
              type="number"
              name="price"
              placeholder="price of book"
              value={form.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-[#0f1117] text-white outline-none border border-gray-700 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 text-sm">Description of book</label>
          <textarea
            rows={4}
            name="description"
            placeholder="description of book"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-[#0f1117] text-white outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-lg w-full"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};