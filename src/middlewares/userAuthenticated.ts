import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Unauthorized");
  }

  const [, authToken] = token.split(" ");

  try {
    const { sub } = verify(
      authToken,
      process.env.JWT_SECRET as string
    ) as Payload;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
