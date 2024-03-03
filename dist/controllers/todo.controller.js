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
exports.updateDiscription = exports.updateTitle = exports.updateDone = exports.getTodoByUserId = exports.getallTodos = exports.insertTodo = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const apiError_1 = require("../utils/apiError");
const prisma = new client_1.PrismaClient();
const insertBodyTypes = zod_1.default.object({
    userId: zod_1.default.number(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
const userIdType = zod_1.default.object({ userId: zod_1.default.number() });
const updateDoneBodyType = zod_1.default.object({
    id: zod_1.default.number(),
    done: zod_1.default.boolean(),
});
const updateTitleBodyType = zod_1.default.object({
    id: zod_1.default.number(),
    title: zod_1.default.string(),
});
const updateDiscriptionBodyType = zod_1.default.object({
    id: zod_1.default.number(),
    description: zod_1.default.string(),
});
// operations needed to be covered in todo
// insert todo
// delete todo
// get todos
// update operations
//      discription
//      title
//      done
exports.insertTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("the todo request body: " + JSON.stringify(req.body));
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
        console.log("the prisma responese after adding todo is: " +
            JSON.stringify(resdata));
        res.send(resdata);
    }
    catch (error) {
        throw error;
    }
}));
exports.getallTodos = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resdata = yield prisma.todo.findMany();
    res.send({ resdata });
}));
exports.getTodoByUserId = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside get todo by id re data is: " + JSON.stringify(req.body));
    const zRes = userIdType.safeParse(req.body);
    if (!zRes.success) {
        throw new apiError_1.apiError("request body not correct", 400);
    }
    const resdata = yield prisma.todo.findMany({
        where: {
            userId: zRes.data.userId,
        },
    });
    if (!resdata) {
        throw new apiError_1.apiError("server write error", 400);
    }
    console.log("res data is: " + JSON.stringify(resdata));
    res.send(resdata);
}));
exports.updateDone = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside updateDone");
    const zRes = updateDoneBodyType.safeParse(req.body);
    if (!zRes.success) {
        throw new apiError_1.apiError("please check request body", 400);
    }
    const resdata = yield prisma.todo.update({
        where: {
            id: zRes.data.id,
        },
        data: {
            done: zRes.data.done,
        },
    });
    if (!resdata) {
        throw new apiError_1.apiError("error with prisma write", 400);
    }
    res.send(resdata);
}));
exports.updateTitle = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside updateTitle");
    const zRes = updateTitleBodyType.safeParse(req.body);
    if (!zRes.success) {
        throw new apiError_1.apiError("please check request body", 400);
    }
    const resdata = yield prisma.todo.update({
        where: {
            id: zRes.data.id,
        },
        data: {
            title: zRes.data.title,
        },
    });
    if (!resdata) {
        throw new apiError_1.apiError("error with prisma write", 400);
    }
    res.send(resdata);
}));
exports.updateDiscription = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside updateDiscription body: " + JSON.stringify(req.body));
    const zRes = updateDiscriptionBodyType.safeParse(req.body);
    if (!zRes.success) {
        throw new apiError_1.apiError("please check request body", 400);
    }
    const resdata = yield prisma.todo.update({
        where: {
            id: zRes.data.id,
        },
        data: {
            description: zRes.data.description,
        },
    });
    if (!resdata) {
        throw new apiError_1.apiError("error with prisma write", 400);
    }
    res.send(resdata);
}));
