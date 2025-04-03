alter table "public"."blogs" alter column "modified_at" set default (now() AT TIME ZONE 'UTC'::text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_modified_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Set the modified_at field to the current timestamp
  NEW.modified_at := now();
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER trigger_update_modified_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION update_modified_at();


