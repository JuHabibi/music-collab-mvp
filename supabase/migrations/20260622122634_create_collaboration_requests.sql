create table public.collaboration_requests (
  id uuid primary key default gen_random_uuid(),

  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,

  message text not null,
  status text not null default 'pending',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint collaboration_requests_status_check
    check (status in ('pending', 'accepted', 'declined', 'cancelled')),

  constraint collaboration_requests_no_self_request_check
    check (sender_id <> receiver_id),

  constraint collaboration_requests_sender_receiver_unique
    unique (sender_id, receiver_id)
);