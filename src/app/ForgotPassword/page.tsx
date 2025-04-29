"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface ForgotPasswordForm {
  email: string;
}

function ForgotPasswordPage() {
  const [formData, setFormData] = useState<ForgotPasswordForm>({ email: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (formData.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/forgotEmailVerification", formData);
    
      if(response.data.success){
        setMessage(`password reset link has been sent to your email :${formData.email}`);   
      }

    } catch (error: any) {
      console.log("handleSubmit:: forgot-password::", error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Enter your Email
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
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`w-full rounded-md bg-purple-600 py-2 px-4 font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${buttonDisabled ? "cursor-not-allowed" : ""}`}
            >
              {buttonDisabled ? "Enter Email" : "Send Reset Link"}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-400">
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer font-medium text-purple-400 hover:text-purple-300"
          >
            Go back to Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
