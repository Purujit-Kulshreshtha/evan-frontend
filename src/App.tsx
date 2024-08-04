import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserDetails from "./pages/UserDetails";
import Home from "./pages/Home";
import { Background } from "./components/Background";
import MultiPurposeModal from "./components/MultiPurposeModal";
import GamePage from "./pages/GamePage";
import UserTag from "./components/UserTag";

function App() {
  return (
    <main className="min-w-screen min-h-screen bg-zinc-900 flex justify-center items-center text-white">
      <BrowserRouter>
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameCode" element={<GamePage />} />
          <Route path="/user" element={<UserDetails />} />
        </Routes>
        <MultiPurposeModal />
        <UserTag />
      </BrowserRouter>
    </main>
  );
}

export default App;
