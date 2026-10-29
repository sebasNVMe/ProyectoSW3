--
-- PostgreSQL database dump
--

\restrict Z6SCcfjFBdkcPcvdSgqMfuuMSELmVb3fntPx9R9qr9Hal7KhaOqOnAHnXvBgDfz

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

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

--
-- Name: appointments_statusapp_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.appointments_statusapp_enum AS ENUM (
    'SCHEDULED',
    'COMPLETED',
    'CANCELLED',
    'RESCHEDULED'
);


--
-- Name: professionals_specialityprof_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.professionals_specialityprof_enum AS ENUM (
    'Neural_Therapy',
    'Chiropractor',
    'Physiotherapy',
    'General'
);


--
-- Name: professionals_typeprof_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.professionals_typeprof_enum AS ENUM (
    'Doctor',
    'Therapist'
);


--
-- Name: users_roleuser_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.users_roleuser_enum AS ENUM (
    'PROFESSIONAL',
    'ADMIN',
    'PATIENT',
    'SCHEDULER'
);


--
-- Name: users_statususer_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.users_statususer_enum AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    "codApp" integer NOT NULL,
    "dateApp" date NOT NULL,
    "timeApp" time without time zone NOT NULL,
    "descApp" character varying,
    "statusApp" public.appointments_statusapp_enum DEFAULT 'SCHEDULED'::public.appointments_statusapp_enum NOT NULL,
    "codProf" integer NOT NULL,
    "codPatient" integer NOT NULL
);


--
-- Name: appointments_codApp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."appointments_codApp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_codApp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."appointments_codApp_seq" OWNED BY public.appointments."codApp";


--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    "codPatient" integer NOT NULL,
    "dateBirthPatient" date,
    "codUser" integer
);


--
-- Name: patients_codPatient_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."patients_codPatient_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_codPatient_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."patients_codPatient_seq" OWNED BY public.patients."codPatient";


--
-- Name: professionals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.professionals (
    "codProf" integer NOT NULL,
    "typeProf" public.professionals_typeprof_enum NOT NULL,
    "specialityProf" public.professionals_specialityprof_enum NOT NULL,
    "arrivalTime" time without time zone NOT NULL,
    "departureTime" time without time zone NOT NULL,
    "attentionInterval" integer NOT NULL,
    "unavailableDays" character varying,
    "codUser" integer
);


--
-- Name: professionals_codProf_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."professionals_codProf_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: professionals_codProf_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."professionals_codProf_seq" OWNED BY public.professionals."codProf";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "codUser" integer NOT NULL,
    "keycloakId" uuid,
    "cedUser" integer NOT NULL,
    "nameUser" character varying NOT NULL,
    "lastNameUser" character varying NOT NULL,
    "statusUser" public.users_statususer_enum DEFAULT 'ACTIVE'::public.users_statususer_enum NOT NULL,
    "roleUser" public.users_roleuser_enum NOT NULL,
    "phoneUser" character varying NOT NULL,
    "genderUser" character varying NOT NULL,
    "securityQuestion" character varying,
    "securityAnswer" character varying
);


--
-- Name: users_codUser_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_codUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_codUser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_codUser_seq" OWNED BY public.users."codUser";


--
-- Name: appointments codApp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN "codApp" SET DEFAULT nextval('public."appointments_codApp_seq"'::regclass);


--
-- Name: patients codPatient; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN "codPatient" SET DEFAULT nextval('public."patients_codPatient_seq"'::regclass);


--
-- Name: professionals codProf; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professionals ALTER COLUMN "codProf" SET DEFAULT nextval('public."professionals_codProf_seq"'::regclass);


--
-- Name: users codUser; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "codUser" SET DEFAULT nextval('public."users_codUser_seq"'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.appointments ("codApp", "dateApp", "timeApp", "descApp", "statusApp", "codProf", "codPatient") FROM stdin;
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.patients ("codPatient", "dateBirthPatient", "codUser") FROM stdin;
\.


--
-- Data for Name: professionals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.professionals ("codProf", "typeProf", "specialityProf", "arrivalTime", "departureTime", "attentionInterval", "unavailableDays", "codUser") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("codUser", "keycloakId", "cedUser", "nameUser", "lastNameUser", "statusUser", "roleUser", "phoneUser", "genderUser", "securityQuestion", "securityAnswer") FROM stdin;
1	5480d75f-820f-4cd4-971f-af549e6b71a6	101010	Libardo	Pantoja	ACTIVE	ADMIN	3001234567	M	Color?	Azul
\.


--
-- Name: appointments_codApp_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."appointments_codApp_seq"', 1, false);


--
-- Name: patients_codPatient_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."patients_codPatient_seq"', 1, false);


--
-- Name: professionals_codProf_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."professionals_codProf_seq"', 1, false);


--
-- Name: users_codUser_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_codUser_seq"', 1, true);


--
-- Name: patients PK_53793f03059842006bf9845902c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "PK_53793f03059842006bf9845902c" PRIMARY KEY ("codPatient");


--
-- Name: professionals PK_a19441d3278459e2cf4ed392813; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professionals
    ADD CONSTRAINT "PK_a19441d3278459e2cf4ed392813" PRIMARY KEY ("codProf");


--
-- Name: appointments PK_c9a5d04d3e280f12fd09b2c83dc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "PK_c9a5d04d3e280f12fd09b2c83dc" PRIMARY KEY ("codApp");


--
-- Name: users PK_f489cff85d6c1e0f6b4a07220d1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_f489cff85d6c1e0f6b4a07220d1" PRIMARY KEY ("codUser");


--
-- Name: professionals REL_4d6ff2b073e866e395337b7855; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professionals
    ADD CONSTRAINT "REL_4d6ff2b073e866e395337b7855" UNIQUE ("codUser");


--
-- Name: patients REL_e86c236671c2b1306021a8f579; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "REL_e86c236671c2b1306021a8f579" UNIQUE ("codUser");


--
-- Name: users UQ_7c4efc5ecbdbcb378b7a43fa011; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_7c4efc5ecbdbcb378b7a43fa011" UNIQUE ("keycloakId");


--
-- Name: appointments FK_39ad1b36a804baf4ef739c11a37; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_39ad1b36a804baf4ef739c11a37" FOREIGN KEY ("codProf") REFERENCES public.professionals("codProf");


--
-- Name: professionals FK_4d6ff2b073e866e395337b7855f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professionals
    ADD CONSTRAINT "FK_4d6ff2b073e866e395337b7855f" FOREIGN KEY ("codUser") REFERENCES public.users("codUser");


--
-- Name: appointments FK_848258ceaa5086adcea78dfc9c1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_848258ceaa5086adcea78dfc9c1" FOREIGN KEY ("codPatient") REFERENCES public.patients("codPatient");


--
-- Name: patients FK_e86c236671c2b1306021a8f579c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "FK_e86c236671c2b1306021a8f579c" FOREIGN KEY ("codUser") REFERENCES public.users("codUser");


--
-- PostgreSQL database dump complete
--

\unrestrict Z6SCcfjFBdkcPcvdSgqMfuuMSELmVb3fntPx9R9qr9Hal7KhaOqOnAHnXvBgDfz

