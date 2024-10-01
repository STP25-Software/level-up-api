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
  phone: string;
  year: number;
  spec: number;
  competition: number;
  reason: string | null;
  teamName: string | null;
  experience: string | null;
  expectations: string | null;
  comments: string | null;
}
