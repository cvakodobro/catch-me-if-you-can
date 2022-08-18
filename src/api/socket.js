import io from "socket.io-client";

export const socket = io.connect("http://192.168.1.10:5001");

socket.reconnectionAttempts = 3;
