import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY as string,{
        algorithms:["RS256"],
    });

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = (decoded as any).payload.sub;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
