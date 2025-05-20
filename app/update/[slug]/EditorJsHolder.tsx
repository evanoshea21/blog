"use client";
import React from "react";
import dynamic from "next/dynamic";

import type { Blog } from "@/lib/types";

const EditorJs = dynamic(() => import("../../create/EditorJs"), { ssr: false });

interface Props {
  existingContent: Blog | null;
}

function EditorJsHolder({ existingContent }: Props) {
  return (
    <div id="editorjs" style={{ border: "1px solid grey", width: "800px" }}>
      <EditorJs existingContent={existingContent} />
    </div>
  );
}

export default EditorJsHolder;
