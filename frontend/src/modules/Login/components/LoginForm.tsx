import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button, Input } from "common/components";
import { useLoginMutation } from "modules/api/mutations/login";

import { LoginPayload, LoginResponse } from "../types";

type Props = {
  onSuccess: (response: AxiosResponse<LoginResponse>) => void;
};

export const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginMutation = useLoginMutation();

  const form = useForm<LoginPayload>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = useCallback(async () => {
    const isValid = await form.trigger();

    if (!isValid || loginMutation.isPending) {
      return;
    }

    try {
      await loginMutation.mutateAsync(form.getValues(), {
        onSuccess: (data) => {
          form.reset();
          onSuccess(data);
        },
      });
    } catch {
      /* empty */
    }
  }, []);

  return (
    <div className="flex flex-col justify-center h-full">
      <Input
        form={form}
        name="email"
        placeholder="name@vow.com"
        label="email"
        registerOptions={{
          required: true,
        }}
      />
      <Input
        form={form}
        name="password"
        label="password"
        type={isPasswordVisible ? "text" : "password"}
        iconPosition="end"
        onIconClick={() => setIsPasswordVisible((prev) => !prev)}
        registerOptions={{
          required: true,
        }}
      />
      <Link
        className="self-end text-gray-800 text-12"
        to="/reset_password"
        data-testid="forgot-password-link"
      >
        Forgot password
      </Link>
      <Button
        styling="blue-button"
        dataTestId="login"
        additionalClasses="w-full mt-7 max_h_910:mt-5"
        type="submit"
        loading={loginMutation.isPending}
        disabled={loginMutation.isPending}
        onClick={onFormSubmit}
      >
        Login
      </Button>
    </div>
  );
};
