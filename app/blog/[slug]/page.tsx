import { getBlogBySlug } from "@/app/server.actions";
import type { BlogData } from "@/lib/types";
import Block from "../Block";

interface Props {
  params: { slug: string };
}
async function RenderBlog({ params }: Props) {
  const { slug } = await params;
  let blog: BlogData | null = null;
  try {
    blog = (await getBlogBySlug(slug)) as unknown as BlogData;
  } catch (e) {
    console.error("Blog fetch err:", e);
  }

  if (!blog) return <div>No blog..</div>;

  return (
    <>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      {blog.content.blocks.length ? (
        <>
          {blog.content.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </>
      ) : (
        <div>No blocks...</div>
      )}
    </>
  );
}

export default RenderBlog;
