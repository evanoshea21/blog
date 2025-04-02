alter table "public"."blogs" drop constraint "blogs_pkey";

drop index if exists "public"."blogs_pkey";

alter table "public"."blogs" drop column "id";

alter table "public"."blogs" add column "author" character varying;

alter table "public"."blogs" add column "category" character varying;

alter table "public"."blogs" add column "content" jsonb;

alter table "public"."blogs" add column "description" character varying;

alter table "public"."blogs" add column "image" character varying;

alter table "public"."blogs" add column "isFeatured" boolean;

alter table "public"."blogs" add column "modified_at" timestamp with time zone default (now() AT TIME ZONE 'America/Los_Angeles'::text);

alter table "public"."blogs" add column "published_at" timestamp with time zone;

alter table "public"."blogs" add column "slug" character varying not null;

alter table "public"."blogs" add column "status" character varying;

alter table "public"."blogs" add column "title" character varying;

CREATE UNIQUE INDEX blogs_slug_key ON public.blogs USING btree (slug);

CREATE UNIQUE INDEX blogs_pkey ON public.blogs USING btree (slug);

alter table "public"."blogs" add constraint "blogs_pkey" PRIMARY KEY using index "blogs_pkey";

alter table "public"."blogs" add constraint "blogs_slug_key" UNIQUE using index "blogs_slug_key";


