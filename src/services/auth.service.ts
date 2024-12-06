import { genSalt, compare, hash } from "bcryptjs";
import userService from "./user.service";
import tokenService from "./token.service";
import {
  ExistingAccountError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "622b2923b5388f77cb09c80119cae3fa96708702831777cc49b49429d6b08fd9";

class AuthService {
  static async login(email: string, password: string) {
    const user = await userService.findUserByEmail(email);

    if (user) {
      const hashedPassword = user?.password;
      const isPasswordValid = await compare(password, hashedPassword);

      if (isPasswordValid) {
        const token = await tokenService.generateToken(
          { user },
          JWT_SECRET,
          "1d"
        );
        return {
          message: "Login successful",
          token,
        };
      } else {
        throw new UnauthorizedError("Invalid password.");
      }
    } else {
      throw new NotFoundError("User not found");
    }
  }
  static async register(email: string, password: string, username: string) {
    const user = await userService.findUserByEmail(email);

    if (user) {
      throw new ExistingAccountError(
        "Account with that email already exists, Login instead."
      );
    } else {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const newUser = await userService.create({
        email,
        password: hashedPassword,
        username,
      });
      return newUser;
    }
  }
}

export default AuthService;
