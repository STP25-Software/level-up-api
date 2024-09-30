import { Client, Pool } from "pg";

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test1",
  password: "24685",
  port: 5432,
});

export interface Attendees {
  name: string;
  email: string;
  academicyear: number;
  spec: number;
  teamname:string|null
  competition: 0|1|2;
  why:string|null;
  expectations:string|null;
  comments:string|null;
}
