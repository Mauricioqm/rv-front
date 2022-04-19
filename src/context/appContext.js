import { io } from "socket.io-client";
import React from "react";
const SOCKET_URL = 'http://localhost:3300/';

export const socket = io(SOCKET_URL, {transports: ['websocket', 'polling', 'flashsocket']});
export const AppContext = React.createContext();