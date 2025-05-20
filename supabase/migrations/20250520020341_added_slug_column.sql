alter table "public"."Blogs" add column "slug" character varying not null;

CREATE UNIQUE INDEX "Blogs_slug_key" ON public."Blogs" USING btree (slug);

alter table "public"."Blogs" add constraint "Blogs_slug_key" UNIQUE using index "Blogs_slug_key";


