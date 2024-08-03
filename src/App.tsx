import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserDetails from "./pages/UserDetails";
import Home from "./pages/Home";
import { Background } from "./components/Background";
import MultiPurposeModal from "./components/MultiPurposeModal";

function App() {
  return (
    <main className="min-w-screen min-h-screen bg-zinc-900 flex justify-center items-center text-white">
      <BrowserRouter>
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserDetails />} />
        </Routes>
        <MultiPurposeModal />
      </BrowserRouter>
    </main>
  );
}

export default App;
