import { HocuspocusProvider } from "@hocuspocus/provider";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";

import "./test.css";

const ydoc = new Y.Doc();
const provider = new HocuspocusProvider({
  url: "ws://localhost:4000",
  name: "test",
  document: ydoc,
});
const ytext = ydoc.getText("monaco");

export default function IndexPage() {
  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={editor => {
        const editorModel = editor.getModel();
        if (!editorModel)
          throw new Error("invariant: monaco editor model is null, this shouldn't happen");
        new MonacoBinding(ytext, editorModel, new Set([editor]), provider.awareness);
      }}
    />
  );
}
