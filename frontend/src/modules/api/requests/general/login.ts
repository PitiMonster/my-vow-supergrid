import { post } from "api";

import {
  GoogleLoginPayload,
  LoginPayload,
  LoginResponse,
} from "modules/Login/types";

export const login = (payload: LoginPayload) =>
  post<LoginResponse, LoginPayload>("/login", payload);

export const googleLogin = (payload: GoogleLoginPayload) =>
  post<LoginResponse>("/google_auth/login/", null, {
    headers: { Authorization: payload.credential },
  });
