import { getAllBlogs } from "../server.actions";
import type { BlogGet } from "@/lib/types";
import EditBtns from "./EditBtns";

async function AdminView() {
  const blogs = await getAllBlogs();

  if (!blogs) return <>No blogs</>;

  return (
    <>
      {blogs.map((blog: BlogGet, i: number) => {
        return (
          <div
            key={blog.id}
            style={{ border: "3px solid grey", margin: "30px" }}
          >
            <p>Title: {blog.title}</p>
            <p>Description: {blog.description}</p>
            <p>Slug: {blog.slug}</p>
            <EditBtns slug={blog.slug} />
          </div>
        );
      })}
    </>
  );
}

export default AdminView;
