-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "kanji_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"character" varchar(1) NOT NULL,
	"meanings" text[] NOT NULL,
	"kunyomi" text[],
	"onyomi" text[],
	"freq" smallint,
	"grade" smallint,
	"jlpt" smallint,
	"strokes" smallint[],
	CONSTRAINT "unique_character" UNIQUE("character")
);

*/