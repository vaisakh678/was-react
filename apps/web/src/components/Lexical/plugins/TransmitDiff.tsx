import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { diff } from "deep-object-diff";
import { EditorState, $applyNodeReplacement } from "lexical";
import React, { useEffect, useRef } from "react";
import useSocket from "../../../hooks/useSocket";
import { produce } from "immer";

const TransmitDiff: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	const previousStateRef = useRef<null | EditorState>(null);
	const socket = useSocket();

	useEffect(() => {
		if (!socket) return;
		socket.onmessage = (data) => {
			const receivedDiff = JSON.parse(data.data || "{}");
			console.log("receivedDiff", receivedDiff);
		};
	}, [socket, editor]);

	const applyDiff = (currentState: EditorState, diffObject: any): EditorState => {
		return produce(currentState, (draftState) => {
			// Apply diffObject to draftState as needed
			// Example: Assuming diffObject directly updates properties
			Object.keys(diffObject).forEach((key) => {
				draftState[key] = diffObject[key];
			});
		});
	};

	const generateDiff = (previousState: EditorState | null, currentState: EditorState) => {
		const prevJSON = previousState ? previousState.toJSON() : {};
		const currJSON = currentState.toJSON();
		return diff(prevJSON, currJSON);
	};

	useEffect(() => {
		if (editor) {
			previousStateRef.current = editor.getEditorState();

			const unsubscribe = editor.registerUpdateListener(({ editorState }) => {
				const diff = generateDiff(previousStateRef.current, editorState);
				previousStateRef.current = editorState;
				if (socket?.readyState) socket?.send(JSON.stringify(diff));
			});

			return () => {
				unsubscribe();
			};
		}
	}, [editor, socket]);

	return null;
};

export default TransmitDiff;

