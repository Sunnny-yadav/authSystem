"use client"
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";


function Profile() {
  const router = useRouter()



  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      if(axios.isAxiosError(error) && error.response){
        console.log("logout::", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <div>
            <h1 className="font-bold text-xl">Profile Page</h1>
          </div>
          
          <div>
            <button
              onClick={logout}
              className="text-xl font-semibold bg-purple-600 p-2 hover:rounded-xl m-2 cursor-pointer hover:bg-purple-700"
            >
              Logout
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Profile;
