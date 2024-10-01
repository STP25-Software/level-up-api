import { RequestHandler, Request } from "express";
import { userGet } from "../requests/userRequest";
export interface userGetQuerry {
  name: string;
  email: string;
  year: string;
  spec: string;
  competition: string;
  why: string;
  teamname: string;
}

export type getUserRequest = Request<
  {},
  userGet[],
  { username: string; password: string },
  userGetQuerry
>;

export type getUserRequestHandler = RequestHandler<
  {},
  userGet[],
  { username: string; password: string },
  userGetQuerry
>;
