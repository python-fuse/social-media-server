import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          message: "Validation Error",
          errors: errors.array(),
        });
        return;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
