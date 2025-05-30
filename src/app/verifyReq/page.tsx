"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const VerificationPending = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  
  useEffect(() => {
    // Get email from search params
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="flex w-full max-w-4xl flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Thank You For Signing Up!
          </h1>
          
          <p className="text-lg text-gray-300 mb-6">
            Check the confirmation email at <br />
            <span className="font-semibold text-white">{email}</span>
          </p>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-3">Note: If you do not receive the email in few minutes:</p>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                check spam folder
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                verify if you typed your email correctly
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-[500px]">
              <Image
                src="/email.png"
                alt="Email verification"
                width={300}
                height={220}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this wrapper component
export default function Verify() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationPending />
    </Suspense>
  );
}
