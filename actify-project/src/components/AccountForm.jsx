// src/components/AccountForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "../Redux/tableSlice";
import { NavLink } from "react-router-dom";

const AccountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Format status to match the table display
    const formattedData = {
      ...data,
      status: data.status === "true" ? "Active" : "Inactive",
    };

    dispatch(addRow(formattedData));
    alert("Row added successfully!");
    reset(); //Clear form after submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[70%]  mx-auto px-8 py-6 bg-gray-100  rounded-lg shadow-md"
    >
      <div className="flex justify-between">
        <h1 className="text-3xl text-black   font-bold">
          Enter The following detials{" "}
        </h1>
        <NavLink
          to={"/table"}
          className="w-[15%] rounded-lg text-xl font-semibold text-center py-3 bg-black text-white"
        >
          Check Table
        </NavLink>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Account Name:</label>
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("accountName", { required: "Account Name is required" })}
        />
        {errors.accountName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.accountName.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone No.:</label>
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("phone", {
            required: "Phone Number is required",
            pattern: { value: /^\d{10}$/, message: "Must be 10 digits" },
          })}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Website:</label>
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("website", {
            required: "Website is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "Invalid URL format (include http:// or https://)",
            },
          })}
        />
        {errors.website && (
          <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Industry:</label>
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("industry")}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Account Status:</label>
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("status", { required: "Account Status is required" })}
        >
          <option value="">Select</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Remark:</label>
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("remark")}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AccountForm;
