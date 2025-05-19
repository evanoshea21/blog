"use client";
import React from "react";
import dynamic from "next/dynamic";
import { handleCreateFormSubmit } from "@/lib/myServerFuncs";

const EditorJs = dynamic(() => import("./EditorJs"), { ssr: false });

function EditorJsHolder() {
  return (
    <div id="editorjs" style={{ border: "1px solid grey", width: "800px" }}>
      <form action={handleCreateFormSubmit}>
        <label htmlFor="slug">Slug</label>
        <input type="text" id="slug" name="slug" />
        <button type="submit">Submit form</button>
      </form>
      <EditorJs />
    </div>
  );
}

export default EditorJsHolder;
