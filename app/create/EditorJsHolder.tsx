"use client";
import React from "react";
import dynamic from "next/dynamic";
import classes from "./styles.module.css";

const EditorJs = dynamic(() => import("./EditorJs"), { ssr: false });

function EditorJsHolder() {
  return (
    <div id="editorjs" className={classes.editorJs} style={{ width: "800px" }}>
      <EditorJs existingContent={null} />
    </div>
  );
}

export default EditorJsHolder;
