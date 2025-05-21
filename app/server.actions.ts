"use server";
import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import type { Blog } from "@/lib/types";

export async function createBlog(
  blogData: Blog
): Promise<{ slugAffected: string }> {
  const supabase = await createClient();

  // supabase insert
  const { error } = await supabase.from("Blogs").insert(blogData);

  if (error) return Promise.reject(JSON.stringify(error));

  return Promise.resolve({ slugAffected: blogData.slug });
}
export async function updateBlog(
  slug: string,
  newBlogData: Blog
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

export async function getRandomBlog(): Promise<Blog | null> {
  const supabase = await createClient();

  // supabase insert
  const { data, error } = await supabase.from("Blogs").select();

  if (error) return Promise.reject(error);

  return Promise.resolve(data[1]);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Blogs")
    .select()
    .eq("slug", slug);

  if (error) return Promise.reject(error);

  return Promise.resolve(data[0]);
}
