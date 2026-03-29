-- Global Tour Connect - Database Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Enums
create type service_type as enum (
  'micro_tour',
  'photo_session',
  'language_assistant',
  'vip_access',
  'table_reservation'
);

create type booking_status as enum (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null default '',
  avatar_url text,
  bio text,
  languages text[] default '{}',
  city text,
  country text,
  is_host boolean default false,
  is_explorer boolean default true,
  rating_avg numeric(3,2) default 0,
  total_reviews integer default 0,
  badges text[] default '{}',
  created_at timestamptz default now()
);

-- Services
create table if not exists services (
  id uuid default uuid_generate_v4() primary key,
  host_id uuid references profiles(id) on delete cascade not null,
  type service_type not null,
  title text not null,
  description text not null default '',
  price numeric(10,2) not null,
  currency text not null default 'USD',
  duration_minutes integer not null default 15,
  latitude double precision not null default 0,
  longitude double precision not null default 0,
  address text not null default '',
  photos text[] default '{}',
  is_active boolean default true,
  rating_avg numeric(3,2) default 0,
  total_bookings integer default 0,
  created_at timestamptz default now()
);

-- Bookings
create table if not exists bookings (
  id uuid default uuid_generate_v4() primary key,
  service_id uuid references services(id) on delete cascade not null,
  explorer_id uuid references profiles(id) on delete cascade not null,
  host_id uuid references profiles(id) on delete cascade not null,
  status booking_status default 'pending',
  scheduled_at timestamptz not null,
  total_price numeric(10,2) not null,
  commission_rate numeric(4,2) not null,
  commission_amount numeric(10,2) not null,
  stripe_payment_intent_id text,
  created_at timestamptz default now()
);

-- Reviews
create table if not exists reviews (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade not null,
  reviewer_id uuid references profiles(id) on delete cascade not null,
  reviewee_id uuid references profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null default '',
  photos text[] default '{}',
  created_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table services enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table messages enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Services policies
create policy "Services are viewable by everyone"
  on services for select using (true);

create policy "Hosts can create services"
  on services for insert with check (auth.uid() = host_id);

create policy "Hosts can update own services"
  on services for update using (auth.uid() = host_id);

create policy "Hosts can delete own services"
  on services for delete using (auth.uid() = host_id);

-- Bookings policies
create policy "Users can view own bookings"
  on bookings for select using (auth.uid() = explorer_id or auth.uid() = host_id);

create policy "Explorers can create bookings"
  on bookings for insert with check (auth.uid() = explorer_id);

create policy "Participants can update bookings"
  on bookings for update using (auth.uid() = explorer_id or auth.uid() = host_id);

-- Reviews policies
create policy "Reviews are viewable by everyone"
  on reviews for select using (true);

create policy "Reviewers can create reviews"
  on reviews for insert with check (auth.uid() = reviewer_id);

-- Messages policies
create policy "Booking participants can view messages"
  on messages for select using (
    exists (
      select 1 from bookings
      where bookings.id = messages.booking_id
      and (bookings.explorer_id = auth.uid() or bookings.host_id = auth.uid())
    )
  );

create policy "Booking participants can send messages"
  on messages for insert with check (
    auth.uid() = sender_id and
    exists (
      select 1 from bookings
      where bookings.id = messages.booking_id
      and (bookings.explorer_id = auth.uid() or bookings.host_id = auth.uid())
    )
  );

create policy "Users can mark messages as read"
  on messages for update using (
    exists (
      select 1 from bookings
      where bookings.id = messages.booking_id
      and (bookings.explorer_id = auth.uid() or bookings.host_id = auth.uid())
    )
  );

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable Realtime for messages
alter publication supabase_realtime add table messages;

-- Indexes
create index if not exists idx_services_host on services(host_id);
create index if not exists idx_services_type on services(type);
create index if not exists idx_services_active on services(is_active);
create index if not exists idx_bookings_explorer on bookings(explorer_id);
create index if not exists idx_bookings_host on bookings(host_id);
create index if not exists idx_bookings_service on bookings(service_id);
create index if not exists idx_messages_booking on messages(booking_id);
create index if not exists idx_reviews_booking on reviews(booking_id);
create index if not exists idx_reviews_reviewee on reviews(reviewee_id);
