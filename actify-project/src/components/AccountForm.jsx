import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTableData } from "../Redux/tableSlice";
import { useNavigate } from "react-router-dom";

const AccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Format the status to match the dummy data format
    const formattedData = {
      ...data,
      status: data.status === "true" ? "Active" : "Inactive",
    };

    dispatch(addTableData(formattedData));
    alert("Account added successfully!");
    navigate("/table"); // Redirect to the table view
  };

  return (
    <div className="p-6 w-[60%] mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Account Name</label>
          <input
            {...register("accountName", {
              required: "Account Name is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.accountName && (
            <p className="text-red-500 text-sm">{errors.accountName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            {...register("website", {
              required: "Website is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Website must start with http:// or https://",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors.website.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Industry</label>
          <select
            {...register("industry", { required: "Industry is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Industry</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
          </select>
          {errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Account Status
          </label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Remark</label>
          <textarea
            {...register("remark")}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => navigate("/table")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
