/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from "axios";

import api from "./apiInstance";

export function post<TResponseData = any, TPayload = any>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.post<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(`/api${url}`, payload, config);
}

export function get<TResponseData = any, TPayload = any>(
  url: string,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.get<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(`/api${url}`, config);
}

export function patch<TResponseData = any, TPayload = any>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.patch<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(`/api${url}`, payload, config);
}

export function put<TResponseData = any, TPayload = any>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.put<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(`/api${url}`, payload, config);
}

export function remove<TResponseData = any, TPayload = any>(
  url: string,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.delete<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(`/api${url}`, config);
}
