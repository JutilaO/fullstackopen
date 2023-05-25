CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);


insert into blogs (author, url, title) values ('Mike', 'linkki', 'Mandariinien kadotus');
insert into blogs (author, url, title) values ('James', '000004', 'Salamanteri');