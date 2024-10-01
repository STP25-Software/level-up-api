import { RequestHandler, Response, Request, raw } from "express";
import { Attendees, db } from "../model/attendees";
import { userPost } from "../requests/userRequest";

export enum specializationEnum {
  Preparatory = 1,
  Electrical,
  Mechanical,
  Architecture,
  Civil,
}

let post: RequestHandler = async (req: Request<{}, {}, userPost, {}>, res) => {
  let rows: Attendees[] = (await db.query("select * from attendees")).rows;
  let teamName: string | null = null;
  let experience:string | null =null;
  let reason:string | null = null;
  if(req.body.competition===1)
  {
teamName=null;
experience=null;
reason=null;
  }
  else
  {
teamName=req.body.participation.teamName;
 experience=req.body.participation.experience;
reason=req.body.participation.reason;
  }
  const {
    name,
    email,
    phone,
    year,
    spec,
    competition,
    comments,
    expectations,// Corrected "participation"
  } = req.body;
  if (name && name.length < 5) {
    res.status(400).json({ message: "name is too short" });
    return;
  } else if (
    phone &&
    phone.length > 11 &&
    phone.length > 13 &&
    !isNaN(Number(phone))
  ) {
    res.status(400).json({ message: "phone is wrong" });
    return;
  } else if (email && email.length < 5 && email.includes("@")) {
    res.status(400).json({ message: "email is wrong" });
    return;
  } else if (rows.find((r) => r.email === email)) {
    res.status(400).json({ message: "email already exists" });
    return;
  } else if (!year || (!(year >= 1 && year <= 5))) {
    res.status(400).json({ message: "academicyear is wrong" });
    return;
  } else if (!spec || !(spec >= 1 && spec <= 5)) {
    res.status(400).json({ message: "spec is wrong" });
    return;
  } else if (!competition || !(competition >= 1 && competition <= 3)) {
    res.status(400).json({ message: "competition is wrong" });
    return;
  } else {
    await db.query(
      "insert into attendees(name,email,year,spec,teamname,competition,expectations,comments,reason,experience,phone) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        name,
        email,
        year,
        spec,
        teamName,
        competition,
        expectations,
        comments,
        reason,
        experience,
        phone,
      ]
    );
    res.status(200).json({ message: "registration successful" });
  }
};

// const get:RequestHandler = async(req:Request<{},{},{}>,res)=>
// {
//     let rows:Attendees[] = (await db.query("select * from Attendees")).rows;
//     res.status(200).json(rows)
// }

export const userController = { post };
