SET TIME ZONE 'Asia/Jerusalem';
SELECT NOW();

DROP TABLE IF EXISTS jns.list;
DROP TABLE IF EXISTS jns.queue;
DROP TABLE IF EXISTS jns.alpaca_run;
DROP TABLE IF EXISTS jns.users;

DROP SCHEMA IF EXISTS jns;

CREATE SCHEMA IF NOT EXISTS jns;

CREATE TABLE jns.users(
	id INTEGER PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE jns.queue(
	id serial PRIMARY KEY,
	user_id INTEGER NOT NULL,
	enter_time TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_queue_user FOREIGN KEY(user_id) REFERENCES jns.users(id) 
		ON DELETE CASCADE
);

CREATE TABLE jns.list(
	id serial PRIMARY KEY,
	user_id INTEGER NOT NULL,
	enter_time TIMESTAMP NOT NULL DEFAULT NOW(),
	exit_time TIMESTAMP,
	CONSTRAINT fk_list_user FOREIGN KEY(user_id) REFERENCES jns.users(id) 
		ON DELETE CASCADE,
	CONSTRAINT chk_list_exit_after_enter 
		CHECK(exit_time IS NULL OR exit_time >= enter_time)
);

CREATE TABLE jns.alpaca_run (
    user_id INT PRIMARY KEY,
    top_score INT,
	CONSTRAINT fk_score_user FOREIGN KEY(user_id) REFERENCES jns.users(id) 
		ON DELETE CASCADE
);