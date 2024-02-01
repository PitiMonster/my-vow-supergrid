import { User } from "common/types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoginResponseError = any;

export type LoginPayload = {
  email: string;
  password: string;
};

export type GoogleLoginPayload = {
  credential: string;
};
export type LoginOrigins = "reset_password" | "activate_account";
export type LoginResponse = User;
