import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


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



export interface Registrations {
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
