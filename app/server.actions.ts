"use server";
import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import type { BlogGet, BlogPost } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createBlog(
  blogData: BlogPost
): Promise<{ slugAffected: string }> {
  const supabase = await createClient();

  // supabase insert
  const { error } = await supabase.from("Blogs").insert(blogData);

  if (error) return Promise.reject(JSON.stringify(error));

  return Promise.resolve({ slugAffected: blogData.slug });
}

export async function updateBlog(
  slug: string,
  newBlogData: BlogPost
): Promise<{ slugAffected: string }> {
  const supabase = await createClient();

  console.log("Updating blog:", slug, newBlogData);

  // const matchTest = await supabase.from("Blogs").select().eq("slug", slug);

  // console.log("Matching rows:", matchTest.data);

  // supabase insert
  const { error } = await supabase
    .from("Blogs")
    .update(newBlogData)
    .eq("slug", slug);

  if (error) return Promise.reject(error);

  return Promise.resolve({ slugAffected: slug });
}

export async function getAllBlogs(): Promise<BlogGet[] | null> {
  const supabase = await createClient();

  // supabase insert
  const { data, error } = await supabase.from("Blogs").select();

  if (error) return Promise.reject(error);

  return Promise.resolve(data);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Blogs")
    .select()
    .eq("slug", slug);

  if (error) return Promise.reject(error);

  return Promise.resolve(data[0]);
}

export async function deleteBlogBySlug(slug: string): Promise<string> {
  const supabase = await createClient();

  const { error } = await supabase.from("Blogs").delete().eq("slug", slug);

  if (error) return Promise.reject(JSON.stringify(error));

  return Promise.resolve("Deleted blog!\nSlug was " + slug);
}

export async function refreshAdminPage() {
  revalidatePath("/admin");
}
