import socketIOClient from "socket.io-client";

export default socketIOClient(process.env.SERVER, {
    transports: ['websocket']
});