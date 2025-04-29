import React from "react";

// This is the correct way to type params for a Next.js page component
interface ProfileProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

function Profile({ params }: ProfileProps) {
  return (
    <div>
      Profile{" "}
      <span className="p-2 bg-orange-500 rounded">{params.id}</span>
    </div>
  );
}

export default Profile;