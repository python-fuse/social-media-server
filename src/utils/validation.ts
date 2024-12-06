import {
  body,
  ValidationChain,
  ValidationError,
  Result,
  param,
} from "express-validator";

interface IUserValidation {
  create: ValidationChain[];
  update: ValidationChain[];
  get: ValidationChain[];
}

interface IPOSTValidation {
  create: ValidationChain[];
  update: ValidationChain[];
  get: ValidationChain[];
  authorGet: ValidationChain[];
}

interface IValidationResponse {
  errors: Result<ValidationError>;
  isValid: boolean;
}

export const userValidation: IUserValidation = {
  create: [
    body("username")
      .isString()
      .isLength({ min: 3, max: 255 })
      .withMessage(
        "Name must be a string with a minimum length of 3 and a maximum length of 255"
      ),
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
      .isString()
      .isLength({ min: 6, max: 255 })
      .withMessage(
        "Password must have a minimum length of 6 and a maximum length of 255"
      ),
  ],
  update: [
    body("username")
      .optional()
      .isString()
      .isLength({ min: 3, max: 255 })
      .withMessage(
        "Name must be a string with a minimum length of 3 and a maximum length of 255"
      ),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("password")
      .optional()
      .isString()
      .isLength({ min: 6, max: 255 })
      .withMessage(
        "Password must have a minimum length of 6 and a maximum length of 255"
      ),
  ],
  get: [param("id").toInt().isInt()],
};

export const postValidation: IPOSTValidation = {
  create: [
    body("authorId").toInt().isInt(),
    body("title").isString().isLength({ min: 5, max: 255 }),
    body("content").isString().isLength({ min: 5 }),
  ],
  update: [
    body("title").optional().isString().isLength({ min: 5, max: 255 }),
    body("content").optional().isString().isLength({ min: 5 }),
  ],
  get: [param("id").toInt().isInt()],
  authorGet: [param("authorId").toInt().isInt()],
};
