import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import TransmitDiff from "./plugins/TransmitDiff";

const theme = {
	// Theme styling goes here
	//...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
	console.error(error);
}

const initialConfig = {
	namespace: "MyEditor",
	theme,
	onError,
};

const Editor = () => {
	return (
		<div className="w-full flex justify-center">
			<div className="relative m-3">
				<LexicalComposer initialConfig={initialConfig}>
					<RichTextPlugin
						contentEditable={<ContentEditable className="w-[650px] p-5 min-h-[800px] outline-none bg-slate-200" />}
						placeholder={<div className="absolute top-0 left-0 p-5 pointer-events-none">Enter some text...</div>}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<TransmitDiff />
				</LexicalComposer>
			</div>
		</div>
	);
};

export default Editor;

