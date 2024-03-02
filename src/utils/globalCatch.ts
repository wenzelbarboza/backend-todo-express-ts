import { asyncHandler } from "./asyncHandler";
import { Request, Response, NextFunction } from "express";

export const globalCatch = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send(err.message);
};
