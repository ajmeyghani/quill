import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:3030");
const client = feathers();
client.configure(socketio(socket));
client.configure(
  auth({
    storage: window.localStorage
  })
);

window.client = client;

export default client;
