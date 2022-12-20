import React, { useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { parse } from 'himalaya';

// To escape eslint

// LOOK: file sorter like in vscode
const rTabs = (str) => str.trim().replace(/^ {4}/gm, "");
const exampleCode = {
  javascript: rTabs(`
    // This is comment to code
    const sample = "Say something now";
    console.log(sample);
  `),
  html: rTabs(`
    <h1 class="title">Hi, Cool Man</h1>
    <p class="description">I'm Boba</p>
  `)
};

export default function App() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const monaco = useMonaco();

  const handleEditorDidMount = () => {

    setIsEditorReady(true);
  };

  const handleEditorChange = (value, event) => {
    const parsed = parse(value);
    console.log('himalaya parse', parsed);
  }

  const handleEditorWillMount = (monaco) => {
    emmetHTML(monaco);
  }

  return (
    <>
      <div className="App">
        <Editor
          className="editor-main-container"
          loading=""
          theme="vs-dark"
          path="test.png"
          defaultLanguage="html"
          defaultValue={exampleCode["html"]}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          options={{
            minimap: {
              enabled: false
            }
          }}
        />
      </div>

      <style jsx={"true"}>
        {`
          .editor-main-container {
            width: 50%;

          }
        `}
      </style>
    </>
  );
}
