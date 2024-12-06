import { User } from "@prisma/client";
import { Response, Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import postService from "../services/post.service";

interface CustomPayload extends JwtPayload {
  user: User;
}

interface CustomRequest extends Request {
  user?: User;
}

export function authorizeUser(
  req: CustomRequest,
  res: Response,
  next: Function
) {
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
    // Type assertion to CustomPayload
    req.user = (decoded as CustomPayload).user;
    next();
  });
}

export async function authorizeOwner(
  req: CustomRequest,
  res: Response,
  next: Function
) {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization token");
    return;
  }

  const postId = parseInt(req.params.id);
  const userId = req.user?.id;
  const post = await postService.findById(postId);
  if (post?.authorId !== userId) {
    res.status(403).send("Forbidden, you are not the owner of this post");
    return;
  }

  next();
}
