import { Request, Response } from "express";
import userService from "../services/user.service";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.findById(+id);
  if (!user) {
    res.status(404);
  }
  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.findAll();

  if (users.length === 0) {
    res.status(404);
  }

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.create({
      username,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await userService.update(+id, {
      name,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.delete(+id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
