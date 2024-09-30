export interface userPost {
  name: string;
  email: string;
  academicyear: number;
  spec:number;
  competition: 0 | 1 | 2;
  why: string | null;
  comments: string | null;
  expectations: string | null;
  teamname: string | null;
}
export enum acadmicEnum {
  freshman = 1,
  sophomore,
  junior,
  senior1,
  senior2,
}
export enum specializationEnum {
  Preparatory = 1,
  Electrical,
  Mechanical,
  Architecture,
  Civil,
}
export enum participationNameEnum {
  "event attendee" = 1,
  "hackathon participant",
  "reverse engineering competition",
  "AI problem solving competition",
}
export interface userGet
{
  name: string;
  email: string;
  academicyear: string;
  spec:string;
  competition: string;
  why: string | null;
  comments: string | null;
  expectations: string | null;
  teamname: string | null;
}