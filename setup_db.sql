DROP TABLE IF EXISTS launch;
DROP DATABASE IF EXISTS spacex_launches;
CREATE DATABASE spacex_launches;
\c spacex_launches;
CREATE TABLE launch (
    id SERIAL PRIMARY KEY,
    rocket_name VARCHAR(50) NOT NULL,
    rocket_type VARCHAR(50) NOT NULL,
    launch_date TIMESTAMP NOT NULL,
    details TEXT NOT NULL,
    article_link TEXT NOT NULL,
    reddit_launch_link TEXT NOT NULL,
    any_parts_reused BOOLEAN NOT NULL,
    launch_success BOOLEAN NOT NULL
);