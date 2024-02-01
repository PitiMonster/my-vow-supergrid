import { logout as logoutRequest } from "../requests";

export const logout = async () => {
  await logoutRequest();
  document.dispatchEvent(new CustomEvent("VOW:logout"));
};
