const joi = require("joi");
const { userSchema } = require("../models");
const {
  catchHandler,
  errorHandler,
  hash,
  responseHandler,
  comparePasswords,
} = require("../utils");
const { jwtToken } = require("../utils/auth");

/**
 * @api {POST} /api/auth/signup
 * @params user signup
 */
module.exports.signUp = async (req, res) => {
  try {
    const schema = joi.object().keys({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    await schema.validateAsync(req.body);

    const { firstName, lastName, email, password } = req.body;

    let user = await userSchema.findOne({ email: email?.toLowerCase() });

    if (user) {
      return errorHandler(res, "User already exists", 400);
    }

    const hashedPassword = await hash(password);

    user = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return responseHandler(res, "User Created", { firstName, lastName, email });
  } catch (error) {
    return catchHandler(res, req, error);
  }
};
/**
 * @api {POST} /api/auth/signin
 * @description Signin User
 */
module.exports.signIn = async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email?.toLowerCase() });

    if (!user) {
      return errorHandler(res, "Invalid Email or Password", 400);
    }

    const match = await comparePasswords(password, user?.password);
    if (!match) {
      return errorHandler(res, "Invalid email id or password", 400);
    }

    let payload = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      userId: user?._id,
    };

    const token = jwtToken(payload);

    payload.token = token;

    return responseHandler(res, "User SignIn Success", payload);
  } catch (error) {
    return catchHandler(res, req, error);
  }
};
