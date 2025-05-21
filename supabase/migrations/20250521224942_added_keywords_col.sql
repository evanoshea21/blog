drop policy "Delete by all users" on "public"."Blogs";

drop policy "Enable Update for all users (DEV)" on "public"."Blogs";

drop policy "Enable insert for all users (DEV)" on "public"."Blogs";

alter table "public"."Blogs" add column "keywords" json;


