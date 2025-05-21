alter table "public"."Blogs" alter column "keywords" set data type jsonb using "keywords"::jsonb;


