import { Handler, Request, Response, NextFunction } from "express";

export const logger: Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} ${req.path} ${res.statusCode}`);
  return next();
};
