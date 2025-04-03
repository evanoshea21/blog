import { createClient } from "@/utils/supabase/server";

async function Page() {
  const sb = await createClient();
  const { data: blogs } = await sb.from("blogs").select();
  console.log("Blogs:", blogs);

  return <div>{JSON.stringify(blogs)}</div>;
}

export default Page;
