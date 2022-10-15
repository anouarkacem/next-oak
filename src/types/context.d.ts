import { Db, db } from "modules/db";

export interface Context {
  db: Db;
}

export const context = {
  db,
};
