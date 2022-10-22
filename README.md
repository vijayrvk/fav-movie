# fav-movie
Clone the repo

## prereq
1.Node.js(14 and above)
2.postgeSQL
`
npm i -g nodemon
`


## Database schema
```
CREATE TABLE public.users
(
    email character varying COLLATE pg_catalog."default" NOT NULL,
    id uuid NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
CREATE TABLE public.movies
(
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id uuid NOT NULL,
    rating integer NOT NULL,
    "cast" character varying[] COLLATE pg_catalog."default" NOT NULL,
    genre character varying COLLATE pg_catalog."default" NOT NULL,
    release_date date NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT movies_pkey PRIMARY KEY (id),
    CONSTRAINT fk_movies_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
```
## Install package
`
npm i
`
## start application
`
nodemon server.js
`
