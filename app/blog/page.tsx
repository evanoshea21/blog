import { createClient } from "@/utils/supabase/server";

async function Page() {
  const supabase = await createClient();
  const { data: blogs } = await supabase.from("blogs").select();
  console.log("blogs:", blogs);

  return <div>{JSON.stringify(blogs)}</div>;
}

export default Page;
