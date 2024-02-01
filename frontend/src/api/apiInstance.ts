/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseURL = window.location.origin.includes("localhost")
  ? "http://localhost:8000"
  : "https://staging.vowmade.dev";

const apiBaseURL = `${baseURL}`;

// TODO: find out how token will be stored and adjust axios instance
const apiInstance = axios.create({
  baseURL: apiBaseURL,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
});

export const publicEndpoints = [
  "/api/login",
  "/api/reset_password",
  "/api/join",
  "/api/waffle_status",
  "/api/reset/send_email/",
  "/api/reset/validate_token/",
  "/api/reset/reset_password/",
  "/api/join/validate_token/",
  "/api/join/google_sign_in/",
  "/api/join/set_password/",
  "/api/google_auth/login/",
  "/api/user",
];

apiInstance.interceptors.request.use((config) => {
  const params = new URLSearchParams(window.location.search);
  const advertiserId = params.get("aid");
  if (
    (advertiserId === "-1" || advertiserId === "") &&
    -!publicEndpoints.includes(config.url!)
  ) {
    document.dispatchEvent(new CustomEvent("VOW:accessDenied"));
    throw new axios.Cancel("Operation canceled by the user");
  }
  if (config.headers && advertiserId) {
    // eslint-disable-next-line no-param-reassign
    config.headers["Vowmade-Advertiser-Id"] = advertiserId;
  }
  if (!advertiserId && !publicEndpoints.includes(config.url!))
    throw new axios.Cancel("Operation cancelled, no advertiser");
  return config;
});

apiInstance.interceptors.response.use(undefined, (error: any) => {
  if (error.response?.status === 401) {
    document.dispatchEvent(new CustomEvent("VOW:logout"));
  }
  return Promise.reject(error);
});

export default apiInstance;
