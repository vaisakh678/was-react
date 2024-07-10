import React, { useEffect, useState } from "react";
import useSocket from "./hooks/useSocket";

const App: React.FC = () => {
	const [value, setValue] = useState();
	const socket = useSocket();

	useEffect(() => {
		if (!socket) return;
		socket.onmessage = (msg) => {
			setValue(msg.data);
		};
		console.log(socket.CONNECTING);
	}, [socket]);

	return (
		<div className="min-h-dvh w-screen p-5">
			<textarea
				rows={15}
				value={value}
				className="border border-slate-500 p-4"
				onChange={(e) => {
					if (socket?.readyState) {
						socket?.send(e.target.value);
					} else {
						console.log("socket is not in ready state!.");
					}
				}}
			/>
			<p>Socket status: {socket?.readyState ? "🟢" : "🛑"}</p>
		</div>
	);
};

export default App;

