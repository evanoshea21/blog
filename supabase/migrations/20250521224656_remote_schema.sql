create policy "Delete by all users"
on "public"."Blogs"
as permissive
for delete
to public
using (true);



