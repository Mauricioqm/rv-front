import './App.css';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/register";
import Perfil from "./pages/perfil"
import Chat from './pages/chat'
import NotFound from './pages/notFounda';
import Header from './Components/header';
import { useSelector } from 'react-redux';
import { AppContext, socket } from './context/appContext';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);

  return (
    <AppContext.Provider value={{ 
      socket, 
      currentRoom, 
      setCurrentRoom, 
      members, 
      setMembers, 
      messages, 
      setMessages, 
      privateMemberMsg, 
      setPrivateMemberMsg, 
      newMessages, 
      setNewMessages, 
      rooms, 
      setRooms 
    }}>
      <BrowserRouter>
        < Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {!user && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />
            </>
          )}
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;