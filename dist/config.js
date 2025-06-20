"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY = exports.JWT_PASSWORD = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.JWT_PASSWORD = "asdasdasasgfa";
exports.API_KEY = mongoose_1.default.connect("mongodb+srv://admin:wyArcxLoww3YzzMO@cluster0.amlcxqh.mongodb.net/second_brain");
