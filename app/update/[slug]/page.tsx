import dynamic from "next/dynamic";
import { getBlogBySlug } from "@/app/server.actions";
import EditorJsHolder from "./EditorJsHolder";

interface Props {
  params: Promise<{ slug: string }>;
}

async function Update({ params }: Props) {
  const { slug } = await params;

  const content = await getBlogBySlug(slug);

  if (!content) {
    return <h2>This blog doens't exist... check slug</h2>;
  }

  return (
    <div id="editorjs" style={{ width: "800px" }}>
      <EditorJsHolder existingContent={content} />
    </div>
  );
}

export default Update;
