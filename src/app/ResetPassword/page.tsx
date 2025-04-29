"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect, Suspense } from "react";

interface ResetPasswordForm {
  newPassword: string;
}

function ResetPasswordPage() {
  const [formData, setFormData] = useState<ResetPasswordForm>({ newPassword: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token"); // 🔥 token will come in the URL query: ?token=xxxxx

  useEffect(() => {
    if (formData.newPassword.length >= 6) { // recommend 6+ characters for password
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

    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    try {
      const response = await axios.post("/api/users/reset-password", {
        token,
        newPassword: formData.newPassword,
      });

      console.log("Password Reset Successfully", response.data);
      setMessage("Password reset successful! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000); // wait 2s then redirect to login
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("handleSubmit:: forgot-password::", error.response.data.error);
        setMessage(error.response.data.error);
      } else {
        console.error("Unexpected error:", error);
        setMessage("Something went wrong. Please try again later.");
      }
    }
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
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
              {buttonDisabled ? "Enter New Password" : "Reset Password"}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-400">
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          Back to{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer font-medium text-purple-400 hover:text-purple-300"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

// Add this wrapper component
export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
