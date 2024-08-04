import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";
import { Game } from "../types";
import httpStatus from "http-status";
import Container from "../components/Container";
import Loader from "../components/Loader";

const GamePage = () => {
  const { user } = useUser();
  const socket = useSocket();
  const { gameCode } = useParams();

  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.emit("fetch-game", gameCode, (response: any) => {
      if (response.status === httpStatus.NOT_FOUND) {
        setGame(null);
      }
      if (response.status === httpStatus.OK) {
        socket.emit("join-game", gameCode, user, (r: any) => {
          setGame(r.game);
        });
      }
      setIsLoading(false);
    });

    return () => {
      socket.emit("leave-game", gameCode);
    };
  }, [socket, gameCode, user]);

  const updateGame = (game: Game) => {
    setGame(game);
  };

  useEffect(() => {
    socket.on("game-updated", updateGame);

    return () => {
      socket.off("game-updated", updateGame);
    };
  }, [socket]);

  if (isLoading) {
    return <Loader />;
  }

  if (!game) {
    return <GameNotFound gameCode={gameCode || ""} />;
  }

  return (
    <div>
      {Object.keys(game.players).map((socketId: string) => {
        return (
          <div key={socketId}>
            <p>{game.players[socketId].name}</p>
          </div>
        );
      })}
    </div>
  );
};

const GameNotFound = (props: { gameCode: string }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Game not found :(</h1>
        <h2 className="text-2xl font-bold py-2">
          No game with the code {props.gameCode} was found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-zinc-300 uppercase text-slate-800 px-2 py-2 mt-10 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
        >
          Home
        </button>
      </div>
    </Container>
  );
};

export default GamePage;
