"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (loginData.email.length > 0 && loginData.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [loginData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", loginData);
      console.log("Login Successful", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("handleSubmit:: login::", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="text-sm">
            <Link href="/ForgotPassword" className="font-semibold text-purple-400 hover:text-purple-300">
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className="w-full rounded-md bg-purple-600 py-2 px-4 font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {buttonDisabled ? "Fill the data" : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signUp" className="font-medium text-purple-400 hover:text-purple-300">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
