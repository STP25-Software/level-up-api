import { RequestHandler, Response, Request, raw,NextFunction } from "express";
import { Registrations, db } from "../model/registrations";
import { userPost } from "../requests/userRequest";
import {
  acadmicEnum,
  participationNameEnum,
  specializationEnum,
  userGet,
} from "../requests/userRequest";
import { getUserRequestHandler, getUserRequest } from "../requests/adimRequest";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();



let post: RequestHandler = async (req: Request<{}, {}, userPost, {}>, res) => {
  try
  {
  let rows: Registrations[] = (await db.query("select * from registrations")).rows;
  let {
    name,
    email,
    phone,
    year,
    spec,
    competition,
    comments,
    teamName,
    reason,
    experience,
    expectations,// Corrected "participation"
  } = req.body;
  if(competition&&isNaN(Number(competition)))
  {
    res.send(400).json({message:"competition is wrong"})
    return;
  }
  if(competition===1)
  {
    teamName=null;
    reason=null;
    experience=null;
  }
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
  } else if ((!year&&typeof year !== "number") || (!(year >= 1 && year <= 5))) {
    res.status(400).json({ message: "academicyear is wrong" });
    return;
  } else if ((!spec && typeof spec !== "number") || !(spec >= 1 && spec <= 5)) {
    res.status(400).json({ message: "spec is wrong" });
    return;
  } else if ((!competition && typeof competition !== "number") || !(competition >= 1 && competition <= 3)) {
    res.status(400).json({ message: "competition is wrong" });
    return;
  } 
  else if((competition===2 ||competition===3) && (!teamName||!reason||!experience))
    {
      res.status(400).json({ message: "teamname or reason or experience is wrong" });
      return;
    } 
  else {
    await db.query(
      `insert into registrations
      (name,email,year,spec,"teamName",competition,expectations,comments,reason,experience,phone)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
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
}
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get: getUserRequestHandler = async (
  req: getUserRequest,
  res: Response
) => {
  try {
  let querryString = "select * from Registrations ";
  let values = [];
  let index: number = 1;
  let isnotfirst = (num: number) => num > 1;
  if (Object.entries(req.query).length !== 0) {
    if (req.query.name) {
      querryString += `where name = $${index++} `;
      values.push(req.query.name);
    }
    if (req.query.email) {
      querryString += `${
        isnotfirst(index) ? "AND" : "where"
      } email = $${index++} `;
      values.push(req.query.email);
    }
    if (!isNaN(parseInt(req.query.year))) {
      querryString += `${
        isnotfirst(index) ? "AND" : "where"
      } year = $${index++} `;
      values.push(req.query.year);
    }
    if (!isNaN(parseInt(req.query.spec))) {
      querryString += `${
        isnotfirst(index) ? "AND" : "where"
      } spec = $${index++} `;
      values.push(req.query.spec);
    }
    if (!isNaN(parseInt(req.query.competition))) {
      querryString += `${
        isnotfirst(index) ? "AND" : "where"
      } competition = $${index++} `;
      values.push(req.query.competition);
    }
    if (req.query.teamName) {
      querryString += `${
        isnotfirst(index) ? "AND" : "where"
      } "teamName" = $${index++} `;
      values.push(req.query.teamName);
    }
  }
  let rows: Registrations[] = (await db.query(querryString, values)).rows;
  let users: userGet[] = [];
  rows.forEach((Attendee) => {
    users.push({
      name: Attendee.name,
      email: Attendee.email,
      phone: Attendee.phone,
      year: acadmicEnum[Attendee.year],
      spec: specializationEnum[Attendee.spec],
      competition: participationNameEnum[Attendee.competition],
      why: Attendee.reason,
      comments: Attendee.comments,
      expectations: Attendee.expectations,
      teamname: Attendee.teamName,
      experience: Attendee.experience,
    });
  });

  res.status(200).json(users);}
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const getbyid: RequestHandler = async (
  req: Request<any, Registrations, {}, {}>,
  res: Response
) => {
  console.log(req.params.index);
  const id = parseInt(req.params.index, 10);
  if (isNaN(id) || id < 0) {
    res.status(400).json({ error: "invalid registration id." });
  } else {
    try {
      const user: Registrations = (
        await db.query("select * from registrations where id = $1", [id])
      ).rows[0];
      if (user) {
        let userToBeSent: userGet = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          experience: user.experience,
          year: acadmicEnum[user.year],
          spec: specializationEnum[user.spec],
          competition: participationNameEnum[user.competition],
          why: user.reason,
          comments: user.comments,
          expectations: user.expectations,
          teamname: user.teamName,
        };
        res.status(200).json(userToBeSent);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.log("Error fetching user at adminController.ts getRegister");
      res.status(500).json({ error: "Internal server error." });
    }
  }
};


const deleteRegister: RequestHandler = async (req: Request, res: Response) => {
  const id = parseInt(req.params.index, 10);
  if (isNaN(id) || id < 0) {
    res.status(400).json({ error: "invalid registration id." });
  } else {
    try {
      const user = await db.query("select * from registrations where id = $1", [
        id,
      ]);

      if (user.rows.length === 0) {
        res.status(404).json({ message: "registration  not found." });
      } else {
        const result = await db.query(
          "DELETE FROM registrations WHERE id = $1",
          [id]
        );
        res.status(200).json({ message: "registration deleted successfully." });
      }
    } catch (error) {
      console.log(error)
      console.log("Error deleting user at userController.ts deleteRegister");
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

const loginAdmin = async (
  req: Request<{}, {}, {  password: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).json({ message: "Login Failed!" });
  } else {
    if (password === process.env.PASSWORD) {
      next();
    } else {
      res.status(400).json({ message: "wrong password!" });
    }
  }
};

export const userController = { post,
  get:get,
  getbyid,
  deleteRegister,
  loginAdmin
 };