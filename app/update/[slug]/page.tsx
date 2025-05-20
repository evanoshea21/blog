import dynamic from "next/dynamic";
import { getBlogBySlug } from "@/app/server.actions";
import EditorJsHolder from "./EditorJsHolder";

interface Props {
  params: Promise<{ slug: string }>;
}

async function Update({ params }: Props) {
  const { slug } = await params;

  const content = await getBlogBySlug(slug);

  return (
    <div id="editorjs" style={{ border: "1px solid grey", width: "800px" }}>
      <EditorJsHolder existingContent={content} />
    </div>
  );
}

export default Update;
