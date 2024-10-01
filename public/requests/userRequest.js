"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participationNameEnum = exports.specializationEnum = exports.acadmicEnum = void 0;
var acadmicEnum;
(function (acadmicEnum) {
    acadmicEnum[acadmicEnum["freshman"] = 1] = "freshman";
    acadmicEnum[acadmicEnum["sophomore"] = 2] = "sophomore";
    acadmicEnum[acadmicEnum["junior"] = 3] = "junior";
    acadmicEnum[acadmicEnum["senior1"] = 4] = "senior1";
    acadmicEnum[acadmicEnum["senior2"] = 5] = "senior2";
})(acadmicEnum = exports.acadmicEnum || (exports.acadmicEnum = {}));
var specializationEnum;
(function (specializationEnum) {
    specializationEnum[specializationEnum["Preparatory"] = 1] = "Preparatory";
    specializationEnum[specializationEnum["Electrical"] = 2] = "Electrical";
    specializationEnum[specializationEnum["Mechanical"] = 3] = "Mechanical";
    specializationEnum[specializationEnum["Architecture"] = 4] = "Architecture";
    specializationEnum[specializationEnum["Civil"] = 5] = "Civil";
})(specializationEnum = exports.specializationEnum || (exports.specializationEnum = {}));
var participationNameEnum;
(function (participationNameEnum) {
    participationNameEnum[participationNameEnum["event attendee"] = 1] = "event attendee";
    participationNameEnum[participationNameEnum["reverse engineering competition"] = 2] = "reverse engineering competition";
    participationNameEnum[participationNameEnum["AI problem solving competition"] = 3] = "AI problem solving competition";
})(participationNameEnum = exports.participationNameEnum || (exports.participationNameEnum = {}));
