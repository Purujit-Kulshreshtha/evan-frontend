import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { SocketProvider } from "./context/SocketContext";
import { ModalPropsProvider } from "./context/ModalPropsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SocketProvider>
    <ModalPropsProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ModalPropsProvider>
  </SocketProvider>
);
