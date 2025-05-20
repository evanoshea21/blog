create policy "Enable Update for all users (DEV)"
on "public"."Blogs"
as permissive
for update
to public
using (true);


create policy "Enable insert for all users (DEV)"
on "public"."Blogs"
as permissive
for insert
to public
with check (true);



