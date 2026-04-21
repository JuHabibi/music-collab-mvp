alter table public.profiles
  alter column city drop not null

alter table public.profiles  
  add constraint profiles_publish_status_check
  check (publish_status in ('draft', 'published', 'hidden'));

alter table public.profiles
  add constraint profiles_published_requirements_check
  check (
    publish_status <> 'published'
    or (
      trim(display_name) <> ''
      and trim(primary_role) <> ''
      and trim(availability) <> ''
      and trim(collaboration_mode) <> ''
      and (
        collaboration_mode = 'remote'
        or (
          collaboration_mode in ('local', 'both')
          and city is not null
          and trim(city) <> ''
        )
      )
      and coalesce(array_length(genres, 1), 0) > 0
      and coalesce(array_length(looking_for, 1), 0) > 0
      and (
        coalesce(array_length(influences, 1), 0) > 0
        or coalesce(array_length(portfolio_links, 1), 0) > 0
      )
    )
  );