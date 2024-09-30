import { RequestHandler, Response, Request, raw } from "express";
import { Attendees, db } from "../model/attendees";
import { userPost } from "../requests/userRequest";
let post: RequestHandler = async (req: Request<{}, {}, userPost, {}>, res) => {
  let rows: Attendees[] = (await db.query("select * from attendees")).rows;

  const { name, email, academicyear, spec, competition, why, comments, expectations, teamname } = req.body;
  if (name && name.length < 5) {
    res.status(400).json({ message: "name is too short" });
  } else if (email && email.length < 5 && email.includes("@")) {
    res.status(400).json({ message: "email is wrong" });
  } else if (rows.find((r) => r.email === email)) {
    res.status(400).json({ message: "email already exists" });
  } else if (academicyear && academicyear < 1 && academicyear > 5) {
    res.status(400).json({ message: "academicyear is wrong" });
  } else if (spec && spec < 1 && spec > 5) {
    res.status(400).json({ message: "spec is wrong" });
  } else if (competition && competition < 1 && competition > 3) {
    res.status(400).json({ message: "participation is wrong" });
  } else {
    console.log(name, email, academicyear, spec, competition, why, comments, expectations, teamname);
    await db.query(
      "insert into attendees(name,email,academicyear,spec,teamname,competition,expectations,comments,why) values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        name,
        email,
        academicyear,
        spec,
        teamname,
        competition,
        expectations,
        comments,
        why,
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
