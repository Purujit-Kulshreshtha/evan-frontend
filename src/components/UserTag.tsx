import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";

const UserTag = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <></>;
  }

  return (
    <button
      onClick={() => navigate("/user")}
      className="fixed flex gap-3 text-2xl top-4 left-0 pl-2 z-10 bg-gradient-to-br from-teal-600 to-teal-900 pr-4 shadow-md shadow-black rounded-r-xl"
    >
      <h1 className="text-2xl font-bold">{user.name}</h1>
    </button>
  );
};

export default UserTag;
