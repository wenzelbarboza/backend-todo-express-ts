import { asyncHandler } from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import { apiError } from "../utils/apiError";

const signInType = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
});

const prisma = new PrismaClient();

export const signInUser = asyncHandler(async (req, res) => {
    console.log("inside user signIn function");
    // console.log("this is body of request: " + JSON.stringify(req.body));

    const zRes = signInType.safeParse(req.body);

    if (!zRes.success) {
        throw new apiError("issue with user data", 400);
    }
    // console.log(
    //     "this is zod response obj: " + zRes.success + JSON.stringify(zRes.data)
    // );

    const { email, firstName, lastName, password } = zRes.data;

    const resdata = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password,
        },
    });

    // console.log("this is response from prisma: " + JSON.stringify(resdata));

    if (!resdata) {
        throw new apiError("data writing issus", 400);
    }

    res.send(resdata);
});

export const getUsers = asyncHandler(async (req, res) => {
    const resdata = await prisma.user.findMany();
    res.send({
        Message: "this is users list",
        resdata,
    });
});
