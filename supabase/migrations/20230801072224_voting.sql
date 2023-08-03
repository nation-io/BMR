create table "public"."voting_polls" (
    "id" bigint generated by default as identity not null,
    "name" character varying not null,
    "created_at" timestamp with time zone default now(),
    "description" character varying
);


alter table "public"."voting_polls" enable row level security;

create table "public"."voting_polls_choices" (
    "id" bigint generated by default as identity not null,
    "poll_id" bigint not null,
    "choice" character varying not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."voting_polls_choices" enable row level security;

create table "public"."voting_polls_voters" (
    "id" bigint generated by default as identity not null,
    "poll_choice_id" bigint not null,
    "wallet" character varying not null,
    "created_at" timestamp with time zone default now(),
    "voting_polls_id" bigint not null
);


alter table "public"."voting_polls_voters" enable row level security;


CREATE UNIQUE INDEX voting_polls_choices_choice_key ON public.voting_polls_choices USING btree (choice);

CREATE UNIQUE INDEX voting_polls_choices_pkey ON public.voting_polls_choices USING btree (id);

CREATE UNIQUE INDEX voting_polls_pkey ON public.voting_polls USING btree (id);

CREATE UNIQUE INDEX voting_polls_votes_pkey ON public.voting_polls_voters USING btree (voting_polls_id);


alter table "public"."voting_polls" add constraint "voting_polls_pkey" PRIMARY KEY using index "voting_polls_pkey";

alter table "public"."voting_polls_choices" add constraint "voting_polls_choices_pkey" PRIMARY KEY using index "voting_polls_choices_pkey";

alter table "public"."voting_polls_voters" add constraint "voting_polls_votes_pkey" PRIMARY KEY using index "voting_polls_votes_pkey";


alter table "public"."voting_polls_choices" add constraint "voting_polls_choices_choice_key" UNIQUE using index "voting_polls_choices_choice_key";

alter table "public"."voting_polls_choices" add constraint "voting_polls_choices_poll_id_fkey" FOREIGN KEY (poll_id) REFERENCES voting_polls(id) ON DELETE CASCADE not valid;

alter table "public"."voting_polls_choices" validate constraint "voting_polls_choices_poll_id_fkey";

alter table "public"."voting_polls_voters" add constraint "voting_polls_votes_poll_choice_id_fkey" FOREIGN KEY (poll_choice_id) REFERENCES voting_polls_choices(id) ON DELETE CASCADE not valid;

alter table "public"."voting_polls_voters" validate constraint "voting_polls_votes_poll_choice_id_fkey";

alter table "public"."voting_polls_voters" add constraint "voting_polls_votes_voting_polls_id_fkey" FOREIGN KEY (voting_polls_id) REFERENCES voting_polls(id) not valid;

alter table "public"."voting_polls_voters" validate constraint "voting_polls_votes_voting_polls_id_fkey";

create policy "Enable read access for all users"
on "public"."voting_polls_voters"
as permissive
for select
to public
using (true);


create policy "enable evrything using service role"
on "public"."voting_polls_voters"
as permissive
for all
to service_role;



