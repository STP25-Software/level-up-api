"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.specializationEnum = void 0;
const attendees_1 = require("../model/attendees");
var specializationEnum;
(function (specializationEnum) {
    specializationEnum[specializationEnum["Preparatory"] = 1] = "Preparatory";
    specializationEnum[specializationEnum["Electrical"] = 2] = "Electrical";
    specializationEnum[specializationEnum["Mechanical"] = 3] = "Mechanical";
    specializationEnum[specializationEnum["Architecture"] = 4] = "Architecture";
    specializationEnum[specializationEnum["Civil"] = 5] = "Civil";
})(specializationEnum = exports.specializationEnum || (exports.specializationEnum = {}));
let post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rows = (yield attendees_1.db.query("select * from attendees")).rows;
        let { name, email, phone, year, spec, competition, comments, teamName, reason, experience, expectations, // Corrected "participation"
         } = req.body;
        if (competition && isNaN(Number(competition))) {
            res.send(400).json({ message: "competition is wrong" });
            return;
        }
        if (competition === 1) {
            teamName = null;
            reason = null;
            experience = null;
        }
        if (name && name.length < 5) {
            res.status(400).json({ message: "name is too short" });
            return;
        }
        else if (phone &&
            phone.length > 11 &&
            phone.length > 13 &&
            !isNaN(Number(phone))) {
            res.status(400).json({ message: "phone is wrong" });
            return;
        }
        else if (email && email.length < 5 && email.includes("@")) {
            res.status(400).json({ message: "email is wrong" });
            return;
        }
        else if (rows.find((r) => r.email === email)) {
            res.status(400).json({ message: "email already exists" });
            return;
        }
        else if ((!year && typeof year !== "number") || (!(year >= 1 && year <= 5))) {
            res.status(400).json({ message: "academicyear is wrong" });
            return;
        }
        else if ((!spec && typeof spec !== "number") || !(spec >= 1 && spec <= 5)) {
            res.status(400).json({ message: "spec is wrong" });
            return;
        }
        else if ((!competition && typeof competition !== "number") || !(competition >= 1 && competition <= 3)) {
            res.status(400).json({ message: "competition is wrong" });
            return;
        }
        else if ((competition === 2 || competition === 3) && (!teamName || !reason || !experience)) {
            res.status(400).json({ message: "teamname or reason or experience is wrong" });
            return;
        }
        else {
            yield attendees_1.db.query("insert into attendees(name,email,year,spec,teamname,competition,expectations,comments,reason,experience,phone) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", [
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
            ]);
            res.status(200).json({ message: "registration successful" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.userController = { post };
