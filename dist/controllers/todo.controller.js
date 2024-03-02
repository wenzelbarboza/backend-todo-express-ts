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
exports.getTodos = exports.insertTodo = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertBodyTypes = zod_1.default.object({
    userId: zod_1.default.number(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
// operations needed to be covered in todo
// insert todo
// delete todo
// get todos
// update operations
//
exports.insertTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zRes = insertBodyTypes.safeParse(req.body);
    if (!zRes.success) {
        throw zRes.error;
    }
    try {
        const { description, title, userId } = zRes.data;
        const resdata = yield prisma.todo.create({
            data: {
                title,
                description,
                userId,
            },
        });
        res.send(resdata);
    }
    catch (error) {
        throw error;
    }
}));
exports.getTodos = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resdata = yield prisma.todo.findMany();
    res.send({ resdata });
}));
