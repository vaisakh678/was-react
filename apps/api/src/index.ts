import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();

const httpServer = app.listen(8000, () => {
	console.log("server is up!.");
});

const wss = new WebSocketServer({ server: httpServer });

const clients = new Map();

wss.on("connection", (ws) => {
	ws.on("error", console.log);
	const sockId = crypto.randomUUID();

	clients.set(sockId, ws);

	console.log("new connection: ", sockId);

	ws.on("close", (ws) => {
		console.log("disconnected: ", sockId);
	});

	ws.on("message", (data, isBinary) => {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});

	ws.send("Hello world from server!.");
});

