
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(25) NOT NULL,
    is_active boolean DEFAULT false,
    expense_id uuid
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount double precision NOT NULL,
    date date DEFAULT CURRENT_DATE,
    description text,
    reccuring boolean DEFAULT false,
    receipt_upload character varying(100),
    creation_date date DEFAULT CURRENT_DATE,
    start_date date DEFAULT CURRENT_DATE,
    end_date date,
    user_id uuid NOT NULL,
    CONSTRAINT expense_check CHECK ((end_date > start_date))
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- Name: income; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.income (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount double precision NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    source character varying(30) NOT NULL,
    description text,
    creation_date date DEFAULT CURRENT_DATE,
    user_id uuid NOT NULL
);


ALTER TABLE public.income OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(50) NOT NULL,
    first_name character varying(35),
    last_name character varying(35) NOT NULL,
    creation_date date DEFAULT CURRENT_DATE
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, is_active, expense_id) FROM stdin;
db0f4987-f170-46ce-b32a-94e5b64b320b	game	t	e0662798-34cd-4815-94fe-64abb619edb7
eae71d75-6dac-492c-811d-3544c7b4d03c	game	t	130d688b-4704-4ddb-ab3d-fda0fc584510
0fe045e9-fac7-42f0-9e30-b0a7b5b74e98	streaming	t	cc9123b3-b1c6-45c5-93d5-9e02a6584321
749c3c0f-7fe1-448d-ae8d-cdb8fc0261ea	rent	t	3b4ce6d7-dcdb-4fd1-b9b9-fe6daf99f199
80c5c1c7-8a9f-43e2-82de-2e0f79e6a047	other	f	\N
cf0a72b6-0034-4e79-833b-63b192075bd2	utilities	f	\N
\.


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense (id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id) FROM stdin;
3b4ce6d7-dcdb-4fd1-b9b9-fe6daf99f199	500	2025-08-25	\N	f	http://domain.com/uploads/receipt.png	2025-08-25	2025-08-25	\N	3978b1a1-87b0-4018-ad5d-21d68dabdd97
cc9123b3-b1c6-45c5-93d5-9e02a6584321	15.5	2025-08-25	netflix	t	\N	2025-08-25	2025-08-01	2025-12-01	3978b1a1-87b0-4018-ad5d-21d68dabdd97
e0662798-34cd-4815-94fe-64abb619edb7	15.5	2025-08-25	gaming	t	\N	2025-08-25	2025-08-01	\N	3978b1a1-87b0-4018-ad5d-21d68dabdd97
130d688b-4704-4ddb-ab3d-fda0fc584510	1499.99	2025-05-10	gamin pc	f	\N	2025-08-25	2025-08-25	\N	9e832813-af83-4885-b4bb-dd2c0d4d8797
\.


--
-- Data for Name: income; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.income (id, amount, date, source, description, creation_date, user_id) FROM stdin;
d43dbe64-deaa-42ac-8fb7-d2de141e132c	200.99	2025-05-15	mission	\N	2025-08-27	963474e1-3daf-4f30-b6a0-b499ac0be0be
a255a73b-68bb-4108-b5ef-21e401c02830	525	2025-08-27	salary	\N	2025-08-27	3978b1a1-87b0-4018-ad5d-21d68dabdd97
bac05d96-3e64-49f8-b90f-e2c0468352d1	400	2025-08-27	selling pc	\N	2025-08-27	3978b1a1-87b0-4018-ad5d-21d68dabdd97
8c763ec4-6bac-4e01-85bb-ad44be899392	100	2025-08-27	money borrowed	\N	2025-08-27	3978b1a1-87b0-4018-ad5d-21d68dabdd97
efe37806-1270-455e-a605-d1a4f2e32c0d	50	2025-08-27	helping the sheriff	\N	2025-08-27	9e832813-af83-4885-b4bb-dd2c0d4d8797
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, first_name, last_name, creation_date) FROM stdin;
3978b1a1-87b0-4018-ad5d-21d68dabdd97	alice@example.com	Alice	Doe	2025-08-25
963474e1-3daf-4f30-b6a0-b499ac0be0be	Decon	decon@example.com	stJohn	2025-08-25
9e832813-af83-4885-b4bb-dd2c0d4d8797	john@example.com	\N	Marston	2025-08-25
\.


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (id);


--
-- Name: income income_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_expense_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_expense_index ON public.expense USING btree (user_id);


--
-- Name: category fk_expense_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk_expense_id FOREIGN KEY (expense_id) REFERENCES public.expense(id) ON DELETE CASCADE;


--
-- Name: expense fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: income fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

