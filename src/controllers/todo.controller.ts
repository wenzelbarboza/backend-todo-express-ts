import { title } from "process";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { PrismaClient } from "@prisma/client";
import { apiError } from "../utils/apiError";

const prisma = new PrismaClient();

const insertBodyTypes = z.object({
    userId: z.number(),
    title: z.string(),
    description: z.string(),
});

const userIdType = z.object({ userId: z.number() });

// operations needed to be covered in todo
// insert todo
// delete todo
// get todos
// update operations
//      discription
//      title
//      done

export const insertTodo = asyncHandler(async (req, res) => {
    console.log("the todo request body: " + JSON.stringify(req.body));

    const zRes = insertBodyTypes.safeParse(req.body);

    if (!zRes.success) {
        throw zRes.error;
    }

    try {
        const { description, title, userId } = zRes.data;

        const resdata = await prisma.todo.create({
            data: {
                title,
                description,
                userId,
            },
        });

        console.log(
            "the prisma responese after adding todo is: " +
                JSON.stringify(resdata)
        );

        res.send(resdata);
    } catch (error) {
        throw error;
    }
});

export const getallTodos = asyncHandler(async (req, res) => {
    const resdata = await prisma.todo.findMany();
    res.send({ resdata });
});

export const getTodoByUserId = asyncHandler(async (req, res) => {
    console.log(
        "inside get todo by id re data is: " + JSON.stringify(req.body)
    );

    const zRes = userIdType.safeParse(req.body);

    if (!zRes.success) {
        throw new apiError("request body not correct", 400);
    }

    const resdata = await prisma.todo.findMany({
        where: {
            userId: zRes.data.userId,
        },
    });

    if (!resdata) {
        throw new apiError("server write error", 400);
    }

    console.log("res data is: " + JSON.stringify(resdata));

    res.send(resdata);
});
