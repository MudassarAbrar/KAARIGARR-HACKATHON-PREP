-- Create reviews table
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  service_request_id uuid references service_requests(id) not null,
  customer_id uuid references profiles(id) not null,
  provider_id uuid references profiles(id) not null,
  service_id uuid references services(id) not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for reviews
alter table reviews enable row level security;
create policy "Reviews are viewable by everyone" on reviews for select using (true);
create policy "Customers can create reviews for their completed requests" on reviews for insert with check (auth.uid() = customer_id);

-- Create notifications table
create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  type text not null, -- 'booking_update', 'new_request', 'review', etc.
  title text not null,
  message text not null,
  related_entity_id uuid, -- booking_id, review_id, etc.
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for notifications
alter table notifications enable row level security;
create policy "Users can view their own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update their own notifications" on notifications for update using (auth.uid() = user_id);
-- System (service role) creates notifications, or triggers.
-- We can allow users to create notifications if needed, but usually it's system-driven.
