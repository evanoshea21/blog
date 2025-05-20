"use client";
import React from "react";
import dynamic from "next/dynamic";

const EditorJs = dynamic(() => import("./EditorJs"), { ssr: false });

function EditorJsHolder() {
  return (
    <div id="editorjs" style={{ border: "1px solid grey", width: "800px" }}>
      <EditorJs existingContent={null} />
    </div>
  );
}

export default EditorJsHolder;
