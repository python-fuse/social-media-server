import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: +id } });
  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: name,
      email,
      password,
    },
  });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await prisma.user.update({
    where: { id: +id },
    data: {
      username: name,
      email,
      password,
    },
  });
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id: +id } });
  res.status(204).json(user);
};
