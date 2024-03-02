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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.signInUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const apiError_1 = require("../utils/apiError");
const signInType = zod_1.default.object({
    email: zod_1.default.string(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    password: zod_1.default.string(),
});
const prisma = new client_1.PrismaClient();
exports.signInUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside user signIn function");
    // console.log("this is body of request: " + JSON.stringify(req.body));
    const zRes = signInType.safeParse(req.body);
    if (!zRes.success) {
        throw new apiError_1.apiError("issue with user data", 400);
    }
    // console.log(
    //     "this is zod response obj: " + zRes.success + JSON.stringify(zRes.data)
    // );
    const { email, firstName, lastName, password } = zRes.data;
    const resdata = yield prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password,
        },
    });
    // console.log("this is response from prisma: " + JSON.stringify(resdata));
    if (!resdata) {
        throw new apiError_1.apiError("data writing issus", 400);
    }
    res.send(resdata);
}));
exports.getUsers = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resdata = yield prisma.user.findMany();
    res.send({
        Message: "this is users list",
        resdata,
    });
}));
