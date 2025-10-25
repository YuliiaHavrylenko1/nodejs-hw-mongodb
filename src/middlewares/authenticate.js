import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) throw createHttpError(401, "No token provided");

    const decoded = jwt.verify(token, JWT_SECRET);
    const session = await Session.findOne({ accessToken: token });
    if (!session) throw createHttpError(401, "Session not found");

    if (new Date() > session.accessTokenValidUntil) {
      throw createHttpError(401, "Access token expired");
    }

    const user = await User.findById(decoded.id);
    if (!user) throw createHttpError(401, "User not found");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
