import { AxiosResponse } from "axios";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "common/utils";

import { LoginForm } from "./components/LoginForm";
import { LoginResponse } from "./types";

export const LoginContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  const onLoginSuccess = async (response: AxiosResponse<LoginResponse>) => {
    const user = response.data;
    setUser(user);

    navigate(
      location.state?.from
        ? location.state.from.pathname + location.state.from.search
        : "/strategies",
      { replace: true }
    );
  };

  return (
    <div className="flex flex-col gap-y-5 justify-center">
      <div className="text-center leading-[0.1rem] my-5 border-b border-gray-700">
        <span className="bg-white px-2.5 py-0 text-gray-700">OR</span>
      </div>
      <LoginForm onSuccess={onLoginSuccess} />
    </div>
  );
};
