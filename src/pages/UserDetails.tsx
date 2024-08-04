import React, { useState } from "react";
import Container from "../components/Container";
import { useUser } from "../context/UserContext";
import { IMAGES } from "../constants";
import { useNavigate } from "react-router";
import { HexColorPicker } from "react-colorful";
import Avatar from "../components/Avatar";

const UserDetails = () => {
  const { user, set: setUser } = useUser();
  const [username, setUsername] = useState<string | undefined>(user?.name);
  const [color, setColor] = useState<string>(user?.color || "#fff");
  const [showColorPicker, setshowColorPicker] = useState(false);
  const navigate = useNavigate();

  const updateUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      setUser({
        name: username,
        color: color || "#fff",
      });
      navigate("/");
    }
  };

  return (
    <Container>
      <div className="px-10 py-10 flex flex-col justify-center items-center gap-5 z-10">
        <h1 className="text-4xl font-bold uppercase">User Details</h1>
        <div className="m-10">
          {username ? (
            <Avatar username={username} color={color} />
          ) : (
            <img
              src={IMAGES.profileIcon}
              alt="profile icon"
              width={100}
              className="bg-zinc-400 rounded-full"
            />
          )}
        </div>
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

          <div className="relative w-full flex justify-center items-center">
            <button
              type="button"
              onClick={() => setshowColorPicker(!showColorPicker)}
              className={`bg-zinc-300 w-full uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500`}
            >
              {showColorPicker ? "Close" : "Change Color"}
            </button>
            {showColorPicker && (
              <div className="absolute -top-[550%]">
                <HexColorPicker color={color} onChange={setColor} />
              </div>
            )}
          </div>

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
