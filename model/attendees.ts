import { Pool } from "pg";

// export const db = new Pool({
//   user: "postgres",
//   password: "24685",
//   host: "localhost",
//   database: "test1",
//   port: 5432,
// });

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
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
