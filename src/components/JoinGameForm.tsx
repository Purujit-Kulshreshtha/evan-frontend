import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultModalProps, useModalProps } from "../context/ModalPropsContext";
import { IoEnter } from "react-icons/io5";
import { useSocket } from "../context/SocketContext";
import httpStatus from "http-status";

const JoinGameForm = () => {
  const navigate = useNavigate();
  const { set: setModal } = useModalProps();
  const socket = useSocket();

  const [gameCode, setGameCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket?.emit("fetch-game", gameCode, (response: any) => {
      if (response.status === httpStatus.NOT_FOUND) {
        setErrorMessage("Game with this code does not exist.");
      }
      if (response.status === httpStatus.OK) {
        setModal(defaultModalProps);
        navigate(`/game/${gameCode}`);
      }
    });
  };

  return (
    <div className="flex flex-col justify-between items-center py-5">
      <h1 className="text-6xl font-extrabold flex flex-col  justify-center items-center gap-4 md:gap-8 text-center">
        <IoEnter />
        Join Game
      </h1>
      <form className="flex flex-col gap-6 mt-16 mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            value={gameCode}
            onChange={(e) => {
              setGameCode(e.target.value);
            }}
            type="text"
            placeholder="Game Code *"
            className="bg-zinc-700 px-4 py-2 border-white border-[0.5px] rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            disabled={gameCode === ""}
            className="bg-zinc-300 uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
          >
            Join
          </button>
        </div>
      </form>
      <p className="text-center text-red-400">{errorMessage}</p>
    </div>
  );
};

export default JoinGameForm;
