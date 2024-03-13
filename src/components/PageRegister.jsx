import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PageRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters long"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Check if email already exists
        const existingUsers = await axios.get("http://localhost:3000/users");
        const isDuplicateEmail = existingUsers.data.some(
          (user) => user.email === values.email
        );
        if (isDuplicateEmail) {
          setErrorMessage(
            "Email already exists. Please choose a different email."
          );
          return;
        }

        // If email is unique, proceed with user creation
        await axios.post("http://localhost:3000/users", {
          name: values.username,
          email: values.email,
          password: values.password,
        });
        alert("User created successfully!");
        resetForm();
        setErrorMessage(""); // Reset error message if submission is successful
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8 mx-auto max-w-md">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="mt-1 p-3 block w-full border-2 border-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 p-3 block w-full border-2 border-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
        {/* Display error message in red if email is duplicate */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 p-3 block w-full border-2 border-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default PageRegister;
