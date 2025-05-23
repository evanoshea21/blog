import type { OutputData } from "@editorjs/editorjs";
import type { Tables } from "@/database.types";
import type { Json as JsonSupa } from "@/database.types";

export const blogEnums = {
  status: ["Unpublished", "Published", "Archived"],
  categories: ["Psych", "Faith", "Personal"],
};

export type BlogStatus = (typeof blogEnums.status)[number];
export type BlogCategory = (typeof blogEnums.categories)[number];

// This makes these table values optional as they have Default Values

export type BlogGet = Tables<"Blogs">;

export type BlogPost = Omit<
  Tables<"Blogs">,
  | "modified_at"
  | "published_at"
  | "created_at"
  | "id"
  | "title"
  | "status"
  | "author"
  | "isFeatured"
  | "keywords"
> &
  Partial<
    Pick<
      Tables<"Blogs">,
      | "modified_at"
      | "published_at"
      | "title"
      | "status"
      | "author"
      | "isFeatured"
      | "keywords"
    >
  >;

export type BlogData = Omit<BlogPost, "content"> & { content: OutputData };

export type Json = JsonSupa;
