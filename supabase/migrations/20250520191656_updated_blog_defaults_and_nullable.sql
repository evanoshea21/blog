alter table "public"."Blogs" alter column "author" set default 'Evan'::character varying;

alter table "public"."Blogs" alter column "author" set not null;

alter table "public"."Blogs" alter column "isFeatured" set default false;

alter table "public"."Blogs" alter column "isFeatured" set not null;

alter table "public"."Blogs" alter column "status" set default 'Unpublished'::character varying;

alter table "public"."Blogs" alter column "status" set not null;

alter table "public"."Blogs" alter column "title" set default 'Untitled'::character varying;

alter table "public"."Blogs" alter column "title" set not null;


