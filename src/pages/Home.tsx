import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";
import Container from "../components/Container";
import { IoEnter } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { useModalProps } from "../context/ModalPropsContext";
import JoinGameForm from "../components/JoinGameForm";
import CreateGameForm from "../components/CreateGameForm";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { set: setModal } = useModalProps();

  const handleSelectType = (component: React.ReactElement) => {
    setModal({
      isOpen: true,
      children: component,
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/user");
    }

    return () => {};
  }, [user, navigate]);

  const boxStyle =
    "w-[130px] h-[130px] lg:w-[240px] lg:h-[240px] flex justify-center items-center text-[55px] lg:text-[110px] rounded-3xl shadow-md shadow-[#121212] bg-gradient-to-br";

  return (
    <div>
      <Container>
        <div className="p-5 md:p-10 z-0 flex flex-col justify-between">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-center">EVAN</h1>
            <p className="text-xs text-center text-gray-300">
              (Undercover rip-off)
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-32 m-2">
            <button
              onClick={() => handleSelectType(<JoinGameForm />)}
              className="flex flex-col justify-center items-center gap-4 cursor-pointer hover:scale-110 transition-all"
            >
              <div className={`${boxStyle} from-red-400 to-red-800`}>
                <IoEnter />
              </div>
              <h1 className="text-xl ">Join Game</h1>
            </button>

            <button
              onClick={() => handleSelectType(<CreateGameForm />)}
              className="flex flex-col justify-center items-center gap-4 cursor-pointer hover:scale-110 transition-all"
            >
              <div className={`${boxStyle} from-blue-400 to-blue-800`}>
                <IoIosAddCircle />
              </div>
              <h1 className="text-xl ">Create Game</h1>
            </button>
          </div>
          <div></div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
