import { Request, Response } from "express";
import authService from "../services/auth.service";
import { ExistingAccountError, UnauthorizedError } from "../utils/errors";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.login(email, password);
    res.json({ ...result }).end();
  } catch (e) {
    if (e instanceof UnauthorizedError) {
      res.status(401).json({ message: e.message });
      return;
    }
    res.sendStatus(500).end();
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const user = await authService.register(email, password, username);
    res.status(201).json({ user });
  } catch (e) {
    if (e instanceof ExistingAccountError) {
      res.status(400).send({ message: e.message });
    }
  }
};
