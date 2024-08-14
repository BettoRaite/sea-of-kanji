import {
  pgTable,
  unique,
  serial,
  varchar,
  smallint,
  text,
} from "drizzle-orm/pg-core";
// import { sql } from "drizzle-orm";

export const kanjiTable = pgTable(
  "kanji_data",
  {
    id: serial("id").primaryKey().notNull(),
    character: varchar("character", { length: 1 }).notNull(),
    meanings: text("meanings").array().notNull(),
    kunyomi: text("kunyomi").array(),
    onyomi: text("onyomi").array(),
    freq: smallint("freq"),
    grade: smallint("grade"),
    jlpt: smallint("jlpt"),
    strokes: smallint("strokes").array(),
  },
  (table) => {
    return {
      uniqueCharacter: unique("unique_character").on(table.character),
    };
  }
);

export type InsertKanji = typeof kanjiTable.$inferInsert;
