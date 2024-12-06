import { User } from "@prisma/client";
import prisma from "../utils/prisma";
import ModelService from "./model.service";

class UserService extends ModelService<User> {
  constructor() {
    super(prisma.user);
  }
}

export default new UserService();
