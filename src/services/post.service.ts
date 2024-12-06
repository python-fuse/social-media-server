import { Post } from "@prisma/client";
import prisma from "../utils/prisma";
import ModelService from "./model.service";

class PostService extends ModelService<Post> {
  constructor() {
    super(prisma.post);
  }

  async findByAuthor(authorId: number) {
    return this.model.findMany({
      where: {
        authorId,
      },
    });
  }
}

export default new PostService();
