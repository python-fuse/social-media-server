import { Response, Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

interface CustomPayload extends JwtPayload {
  id: string;
}

export function authorizeUser(req: Request, res: Response, next: Function) {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization token");
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }
    next();
  });
}

export function authorizeOwner(req: Request, res: Response, next: Function) {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization token");
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    const decodedData = decoded as CustomPayload;
    if (err) {
      res.status(401).send("Unauthorized, Log in again");
      return;
    }
    if (decodedData.id !== req.body.authorId) {
      res.status(403).send("Forbidden, You are not the owner of this post");
      return;
    }
    next();
  });
}
