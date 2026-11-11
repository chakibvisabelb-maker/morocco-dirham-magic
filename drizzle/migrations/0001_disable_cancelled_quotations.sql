REVOKE ALL ON public.quotations FROM authenticated, anon;
REVOKE ALL ON SEQUENCE public.quotations_number_seq FROM authenticated, anon;
REVOKE ALL ON public.user_roles FROM authenticated, anon;
COMMENT ON TABLE public.quotations IS 'DEPRECATED: quotation request cancelled before implementation; empty and inaccessible to app users.';
COMMENT ON TABLE public.user_roles IS 'DEPRECATED: quotation request cancelled before implementation; empty and inaccessible to app users.';