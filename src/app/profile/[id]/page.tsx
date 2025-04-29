import React from "react";

interface ProfileProps {
  params: {
    id: string;
  };
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
