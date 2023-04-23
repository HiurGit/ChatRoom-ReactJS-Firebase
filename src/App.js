import "./App.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AutProvider from "./context/AutProvider";
import AppProvider from "./context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoom";
import InviteMemberModal from "./components/Modals/inveteMem";

function App() {
  return (
    <BrowserRouter>
      <AutProvider>
        <AppProvider>
       
         
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
       

          <AddRoomModal />
          <InviteMemberModal/>
        </AppProvider>
      </AutProvider>
    </BrowserRouter>
  );
}

export default App;
