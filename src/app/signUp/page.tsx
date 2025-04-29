"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormData {
  email: string;
  username: string;
  password: string;
}

function Sign() {
  const router = useRouter();
  const [formData, setformData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      formData.username.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setformData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("/api/users/signUp", formData);

      if (response.data.success) {
        console.log("signUp succeess", response.data);
        setformData({ username: "", email: "", password: "" });
        router.push(`/verifyReq/${response.data.user.email}`);
      }
    } catch (error) {
      console.log("handleSubmit:: SignUp::", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className="w-full rounded-md bg-purple-600 py-2 px-4 font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {buttonDisabled ? "No SignUp" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sign;
