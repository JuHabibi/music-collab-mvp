alter policy "Users can read their own profile"
on public.profiles
using ((select auth.uid()) = id);

alter policy "Users can create their own profile"
on public.profiles
with check ((select auth.uid()) = id);

alter policy "Users can update their own profile"
on public.profiles
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);



alter policy "Users can read their collaboration requests"
on public.collaboration_requests
using (
  (select auth.uid()) = sender_id
  or (select auth.uid()) = receiver_id
);

alter policy "Users can create collaboration requests"
on public.collaboration_requests
with check (
  (select auth.uid()) = sender_id
);

drop policy if exists "Users can update their collaboration requests"
on public.collaboration_requests;

create policy "Users can update their collaboration requests"
on public.collaboration_requests
for update
to authenticated
using (
  status = 'pending'
  and (
    (select auth.uid()) = sender_id
    or (select auth.uid()) = receiver_id
  )
)
with check (
  (
    (select auth.uid()) = sender_id
    and status = 'cancelled'
  )
  or
  (
    (select auth.uid()) = receiver_id
    and status in ('accepted', 'declined')
  )
);