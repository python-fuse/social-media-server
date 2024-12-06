import { User } from "@prisma/client";
import prisma from "../utils/prisma";
import ModelService from "./model.service";

class UserService extends ModelService<User> {
  constructor() {
    super(prisma.user);
  }

  findUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  };
}

export default new UserService();
