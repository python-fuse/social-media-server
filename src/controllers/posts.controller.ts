import { Request, Response } from "express";
import prisma from "../utils/prisma";
import postService from "../services/post.service";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.findAll();
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.findById(+id);
  res.json(post);
};

export const getPostsByAuthor = async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const posts = await postService.findByAuthor(+authorId);
  res.json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { authorId, title, content } = req.body;
  const post = await postService.create({ authorId, title, content });
  res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await postService.update(+id, { title, content });
  res.status(200).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await postService.delete(+id);
  res.status(204).end();
};
