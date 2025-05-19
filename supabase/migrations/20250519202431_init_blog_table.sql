alter table "public"."Blogs" add column "author" character varying;

alter table "public"."Blogs" add column "category" character varying;

alter table "public"."Blogs" add column "content" jsonb;

alter table "public"."Blogs" add column "description" character varying;

alter table "public"."Blogs" add column "image" character varying;

alter table "public"."Blogs" add column "isFeatured" boolean;

alter table "public"."Blogs" add column "modified_at" timestamp with time zone default now();

alter table "public"."Blogs" add column "published_at" timestamp with time zone;

alter table "public"."Blogs" add column "status" character varying;

alter table "public"."Blogs" add column "title" character varying;

create policy "Enable read access for all users"
on "public"."Blogs"
as permissive
for select
to public
using (true);



