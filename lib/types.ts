import type { OutputData } from "@editorjs/editorjs";
import type { Tables } from "@/database.types";
import type { Json as JsonSupa } from "@/database.types";

export const blogEnums = {
  status: [],
  categories: ["Psych", "Faith", "Personal"],
};

export type BlogCategory = "Psych" | "Faith" | "Personal";

export const BlogCategories: BlogCategory[] = ["Personal", "Psych", "Faith"];

export type PublishStatus = "Unpublished" | "Published" | "De-Indexed";

export const PublishStatuses: PublishStatus[] = [
  "Unpublished",
  "Published",
  "De-Indexed",
];
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
  | "category"
> &
  Partial<
    Pick<
      Tables<"Blogs">,
      | "modified_at"
      | "published_at"
      | "title"
      | "author"
      | "isFeatured"
      | "keywords"
    >
  > & { status: PublishStatus; category: BlogCategory };

export type BlogData = Omit<BlogPost, "content"> & { content: OutputData };

export type Json = JsonSupa;
