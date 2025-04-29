"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Profile() {
  const router = useRouter()
  const [userInfo, setuserInfo] = useState("")


  const getuserData = async ()=>{
    const response = await axios.get('/api/users/me')
    setuserInfo(response.data.data._id)
  };


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
          <div className="bg-green-400 p-2 rounded-xl text-center">
            {userInfo==="" ? "Nothing" : <Link href={`/profile/${userInfo}`}>{userInfo}</Link>}
          </div>
          <div>
            <button
              onClick={logout}
              className="text-xl font-semibold bg-purple-600 p-2 hover:rounded-xl m-2 cursor-pointer hover:bg-purple-700"
            >
              Logout
            </button>
          </div>
          <div>
            <button
              onClick={getuserData}
              className="text-xl font-semibold  p-2  hover:rounded-xl bg-blue-700 m-2 cursor-pointer "
            >
                getMyData
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
