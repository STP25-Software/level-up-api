export interface userPost {
  name: string;
  email: string;
  phone: string;
  year: number;
  spec: number;
  competition: number;
  participation: {
    teamName: string | null;
    experience: string | null;
    reason: string | null;
  };
  comments: string | null;
  expectations: string | null;
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
  "reverse engineering competition",
  "AI problem solving competition",
}
export interface userGet {
  name: string;
  email: string;
  phone: string;
  year: string;
  spec: string;
  competition: string;
  why: string | null;
  comments: string | null;
  expectations: string | null;
  experience: string | null;
  teamname: string | null;
}
