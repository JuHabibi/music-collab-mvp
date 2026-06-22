alter table public.collaboration_requests
enable row level security;

create policy "Users can read their collaboration requests"
on public.collaboration_requests
for select
to authenticated
using (
  auth.uid() = sender_id
  or auth.uid() = receiver_id
);

create policy "Users can create collaboration requests"
on public.collaboration_requests
for insert
to authenticated
with check (
  auth.uid() = sender_id
);

create policy "Users can update their collaboration requests"
on public.collaboration_requests
for update
to authenticated
using (
  auth.uid() = sender_id
  or auth.uid() = receiver_id
)
with check (
  auth.uid() = sender_id
  or auth.uid() = receiver_id
);