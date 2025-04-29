"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface VerificationSuccessProps {
  token?: string;
}

const VerificationSuccess = () => {

  const [token , settoken] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your account...');
  
  const verifyAccount = async () => {
    try {
        const response = await axios.post('/api/users/verfiyMail',{token});
     
      if (response.data.success) {
        setVerificationStatus('success');
        setMessage('Your email has been successfully verified!');
      } else {
        setVerificationStatus('error');
        setMessage('Verification failed. The link may be expired or invalid.');
      }

    } catch (error: any) {
      setVerificationStatus('error');
      setMessage('An error occurred during verification. Please try again.');
      console.log(error.response.data.error)
    }
  };

  useEffect(()=>{
    const urlParams = window.location.search;
    const tokenVal = urlParams.split("=")[1]
    settoken(tokenVal)
  },[])

  useEffect(() => {
    if(token.length > 0){
        verifyAccount()
    }
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 text-center shadow-xl">
        {verificationStatus === 'loading' && (
          <>
            <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-t-purple-500 border-gray-700"></div>
            <h2 className="text-xl font-semibold text-white">{message}</h2>
          </>
        )}
        
        {verificationStatus === 'success' && (
          <>
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-white">Email Verified!</h2>
            <p className="mb-6 text-gray-300">{message}</p>
            <Link 
              href="/login"
              className="block w-full rounded-md bg-purple-600 py-2 px-4 font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Continue to Login
            </Link>
          </>
        )}
        
        {verificationStatus === 'error' && (
          <>
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-white">Verification Failed</h2>
            <p className="mb-6 text-gray-300">{message}</p>
            <div className="flex flex-col space-y-3">
              <Link 
                href="/signup"
                className="block w-full rounded-md bg-purple-600 py-2 px-4 font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Try Signing Up Again
              </Link>
              <Link 
                href="/help"
                className="block w-full rounded-md border border-gray-600 py-2 px-4 font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Get Help
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationSuccess;