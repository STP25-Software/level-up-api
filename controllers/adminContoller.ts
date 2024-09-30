import { RequestHandler, Response, Request, NextFunction } from "express";
import { Attendees, db } from "../model/attendees";
import {
  acadmicEnum,
  specializationEnum,
  participationNameEnum,
  userGet,
} from "../requests/userRequest";
import { getUserRequestHandler,getUserRequest} from "../requests/adimRequest";
const loginAdmin = async (
  req: Request<{}, {}, { username: string; password: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const user = (
    await db.query(
      "SELECT * FROM admins WHERE username = $1 AND password = $2",
      [username, password]
    )
  ).rows[0];
  if (!user) {
    res.status(400).json({ message: "Login Failed!" });
  } else {
    next();
  }
};


const get: getUserRequestHandler = async (req:getUserRequest,res:Response)=> {
  let rows: Attendees[] = (await db.query("select * from attendees")).rows;
  if(Object.entries(req.query).length!==0)
  {
    if(req.query.name)
    {
      rows=rows.filter((attendee)=>attendee.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }
    if(req.query.email)
    {
      rows=rows.filter((attendee)=>attendee.email===req.query.email);
    }
    if(!isNaN(parseInt(req.query.academicyear)))
    {
      rows=rows.filter((attendee)=>attendee.academicyear===parseInt(req.query.academicyear));
    }
    if(!isNaN(parseInt(req.query.spec)))
    {
      rows=rows.filter((attendee)=>attendee.spec===parseInt(req.query.spec));
    }
    if(!isNaN(parseInt(req.query.competition)))
    {
      rows=rows.filter((attendee)=>attendee.competition===parseInt(req.query.competition));
    }
  }
  let users: userGet[] = [];
  rows.forEach((Attendee) => {
    users.push({
      name: Attendee.name,
      email: Attendee.email,
      academicyear: acadmicEnum[Attendee.academicyear],
      spec: specializationEnum[Attendee.spec],
      competition: participationNameEnum[Attendee.competition],
      why: Attendee.why,
      comments: Attendee.comments,
      expectations: Attendee.expectations,
      teamname: Attendee.teamname,
    });
  });

  res.status(200).json(users);
};

const getbyid: RequestHandler = async (
  req: Request<any, Attendees, {}, {}>,
  res: Response
) => {
  console.log(req.params.index);
  const id = parseInt(req.params.index, 10);
  let registrations: Attendees[] = (await db.query("select * from attendees"))
    .rows;
  if (isNaN(id) || id < 0 || id >= registrations.length) {
    res.status(400).json({ error: "invalid registration id." });
  } else {
    try {
      const user: Attendees = (
        await db.query("select * from attendees where id = $1", [id])
      ).rows[0];
      if (user) {
        let userToBeSent: userGet = {
          name: user.name,
          email: user.email,
          academicyear: acadmicEnum[user.academicyear],
          spec: specializationEnum[user.spec],
          competition: participationNameEnum[user.competition],
          why: user.why,
          comments: user.comments,
          expectations: user.expectations,
          teamname: user.teamname,
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

  let registrations: Attendees[] = (await db.query("select * from attendees"))
    .rows;

  if (isNaN(id) || id < 0 || id >= registrations.length) {
    res.status(400).json({ error: "invalid registration id." });
  } else {
    try {
      const user = await db.query("select * from attendees where id = $1", [
        id,
      ]);

      if (user.rows.length === 0) {
        res.status(404).json({ message: "Registration  not found." });
      } else {
        const result = await db.query("DELETE FROM attendees WHERE id = $1", [
          id,
        ]);
        registrations.splice(id, 1);
        res.status(200).json({ message: "Registration deleted successfully." });
      }
    } catch (error) {
      console.log("Error deleting user at adminController.ts deleteRegister");
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const adminController = {
 get,
 getbyid,
 deleteRegister,
 loginAdmin
};
