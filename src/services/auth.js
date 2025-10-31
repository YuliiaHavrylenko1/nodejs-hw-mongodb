import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw createHttpError(409, "Email in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const userData = user.toObject();
  delete userData.password;

  return userData;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createHttpError(401, "Invalid email or password");

  await Session.deleteMany({ userId: user._id });

  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30d" });

  const now = new Date();
  const session = new Session({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  });

  await session.save();

  return { accessToken, refreshToken };
};

export const refresh = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw createHttpError(401, "No refresh token provided");

  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session) throw createHttpError(401, "Session not found");

  const decoded = jwt.verify(oldRefreshToken, JWT_SECRET);
  if (!decoded) throw createHttpError(401, "Invalid refresh token");

  await Session.deleteOne({ _id: session._id });

  const accessToken = jwt.sign({ id: session.userId }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: session.userId }, JWT_SECRET, { expiresIn: "30d" });

  const now = new Date();
  await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

export const logout = async (refreshToken) => {
  if (!refreshToken) throw createHttpError(401, "No refresh token provided");
  const session = await Session.findOne({ refreshToken });
  if (!session) throw createHttpError(401, "Session not found");
  await Session.deleteOne({ _id: session._id });
};
