import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "modules/api/utils/logout";

export const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, []);

  return null;
};
