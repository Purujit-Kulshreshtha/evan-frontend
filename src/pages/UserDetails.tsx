import React, { useState } from "react";
import Container from "../components/Container";
import { useUser } from "../context/UserContext";
import { IMAGES } from "../constants";
import { useNavigate } from "react-router";

const UserDetails = () => {
  const { user, set: setUser } = useUser();
  const [username, setUsername] = useState<string | undefined>(user?.name);
  const navigate = useNavigate();
  console.log(username);

  const updateUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      setUser({
        name: username,
      });
      navigate("/");
    }
  };

  return (
    <Container>
      <div className="px-10 py-10 flex flex-col justify-center items-center gap-5 z-10">
        <h1 className="text-4xl font-bold uppercase">Username</h1>
        <img
          src={IMAGES.profileIcon}
          alt="profile icon"
          width={100}
          className="bg-zinc-400 rounded-full m-10"
        />
        <form className="flex flex-col gap-6" onSubmit={updateUsername}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
            className="bg-zinc-700 px-4 py-2 border-white border-[0.5px] rounded-2xl"
          />

          <div className="flex flex-col gap-2">
            <button
              disabled={!username || username === ""}
              className="bg-zinc-300 uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
            >
              Update
            </button>
            <p className="text-xs text-center text-gray-400">
              (username is mandatory)
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UserDetails;
