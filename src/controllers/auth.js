import * as authService from "../services/auth.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      status: 201,
      message: "Successfully registered a user!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.status(200).json({
      status: 200,
      message: "Successfully logged in an user!",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.refresh(req.cookies.refreshToken);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.status(200).json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await authService.logout(req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    res.status(204).end(); 
  } catch (err) {
    next(err);
  }
};
