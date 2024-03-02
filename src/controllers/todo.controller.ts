import { title } from "process";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertBodyTypes = z.object({
    userId: z.number(),
    title: z.string(),
    description: z.string(),
});

// operations needed to be covered in todo
// insert todo
// delete todo
// get todos
// update operations
//

export const insertTodo = asyncHandler(async (req, res) => {
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
        res.send(resdata);
    } catch (error) {
        throw error;
    }
});

export const getTodos = asyncHandler(async (req, res) => {
    const resdata = await prisma.todo.findMany();
    res.send({ resdata });
});
