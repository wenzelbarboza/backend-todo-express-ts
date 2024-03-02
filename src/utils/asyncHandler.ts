import { Request, Response, NextFunction } from "express";

type asyncCallback = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

export const asyncHandler =
    (callback: asyncCallback) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            next(error);
        }
    };
