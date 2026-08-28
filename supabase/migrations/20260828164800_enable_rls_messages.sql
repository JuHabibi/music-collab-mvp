alter table public.messages
enable row level security;

create policy "Participants can read messages in accepted collaborations"
on public.messages
for select
to authenticated
using (
  exists (
    select 1
    from public.collaboration_requests cr
    where cr.id = messages.collaboration_request_id
      and cr.status = 'accepted'
      and (
        (select auth.uid()) = cr.sender_id
        or (select auth.uid()) = cr.receiver_id
      )
  )
);

create policy "Participants can send messages in accepted collaborations"
on public.messages
for insert
to authenticated
with check (
  (select auth.uid()) = sender_id
  and exists (
    select 1
    from public.collaboration_requests cr
    where cr.id = messages.collaboration_request_id
      and cr.status = 'accepted'
      and (
        (select auth.uid()) = cr.sender_id
        or (select auth.uid()) = cr.receiver_id
      )
  )
);
