create table "public"."blogs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."blogs" enable row level security;

CREATE UNIQUE INDEX blogs_pkey ON public.blogs USING btree (id);

alter table "public"."blogs" add constraint "blogs_pkey" PRIMARY KEY using index "blogs_pkey";

grant delete on table "public"."blogs" to "anon";

grant insert on table "public"."blogs" to "anon";

grant references on table "public"."blogs" to "anon";

grant select on table "public"."blogs" to "anon";

grant trigger on table "public"."blogs" to "anon";

grant truncate on table "public"."blogs" to "anon";

grant update on table "public"."blogs" to "anon";

grant delete on table "public"."blogs" to "authenticated";

grant insert on table "public"."blogs" to "authenticated";

grant references on table "public"."blogs" to "authenticated";

grant select on table "public"."blogs" to "authenticated";

grant trigger on table "public"."blogs" to "authenticated";

grant truncate on table "public"."blogs" to "authenticated";

grant update on table "public"."blogs" to "authenticated";

grant delete on table "public"."blogs" to "service_role";

grant insert on table "public"."blogs" to "service_role";

grant references on table "public"."blogs" to "service_role";

grant select on table "public"."blogs" to "service_role";

grant trigger on table "public"."blogs" to "service_role";

grant truncate on table "public"."blogs" to "service_role";

grant update on table "public"."blogs" to "service_role";


