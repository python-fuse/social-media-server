import jwt from "jsonwebtoken";

class TokenService {
  static async generateToken(payload: any, secret: string, expiresIn: string) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static async verifyToken(token: string, secret: string) {
    return jwt.verify(token, secret);
  }
}

export default TokenService;
