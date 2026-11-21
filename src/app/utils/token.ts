import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { envVars } from "../config/env";
import { cookieUtils } from "./cookie";
import ms, { StringValue } from "ms";
import { Response } from "express";

// create access token
const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );

  return accessToken;
};

// create refresh token
const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions,
  );

  return refreshToken;
};

// set access token into cookie
const setAccessTokenCookie = (res: Response, token: string) => {
  const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as StringValue)/1000;
  cookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: Number(maxAge),
  });
};

// set refresh token into cookie
const setRefreshTokenCookie = (res: Response, token: string) => {
  const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as StringValue)/1000;
  cookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: Number(maxAge),
  });
};

// set better auth session into cookie
const setBetterAuthSessionCookie = (res: Response, token: string) => {
  const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as StringValue)/ 1000;
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: Number(maxAge),
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
};
