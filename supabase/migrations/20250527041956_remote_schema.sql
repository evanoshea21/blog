alter table "public"."Blogs" add constraint "publish_status_check" CHECK (((status)::text = ANY ((ARRAY['Published'::character varying, 'Unpublished'::character varying, 'De-Indexed'::character varying])::text[]))) not valid;

alter table "public"."Blogs" validate constraint "publish_status_check";

create policy "Delete ALL"
on "public"."Blogs"
as permissive
for delete
to public
using (true);


create policy "Insert ALL"
on "public"."Blogs"
as permissive
for insert
to public
with check (true);


create policy "Update ALL"
on "public"."Blogs"
as permissive
for update
to public
using (true);



