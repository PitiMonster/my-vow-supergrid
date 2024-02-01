import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { googleLogin, login } from "modules/api/requests";
import {
  GoogleLoginPayload,
  LoginPayload,
  LoginResponse,
  LoginResponseError,
} from "modules/Login/types";

export const useLoginMutation = () => {
  const mutation = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<LoginResponseError>,
    LoginPayload
  >({ mutationFn: login });
  return mutation;
};

export const useGoogleLoginMutation = () => {
  const mutation = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<LoginResponseError>,
    GoogleLoginPayload
  >({ mutationFn: googleLogin });
  return mutation;
};
