import { Request, Response } from "express";
import postService from "../services/post.service";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.findAll();
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.findById(+id);
  if (!post) {
    res.status(404).end();
  }
  res.json(post).end();
};

export const getPostsByAuthor = async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const posts = await postService.findByAuthor(+authorId);
  res.json(posts).end();
};

export const createPost = async (req: Request, res: Response) => {
  const { authorId, title, content } = req.body;
  const post = await postService.create({ authorId, title, content });
  res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postService.update(+id, { title, content });
    res.status(200).json(post);
  } catch (e) {
    res.status(404).send("Post does not exist!").end();
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await postService.delete(+id);
    res.status(204).end();
  } catch (e) {
    res.status(404).send("Post does not exist!").end();
  }
};
