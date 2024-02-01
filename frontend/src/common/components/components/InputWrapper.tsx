/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import classNames from "classnames";
import { get } from "react-hook-form";

import { TInputWrapper } from "../types";

type Props = React.PropsWithChildren<TInputWrapper> & {
  alwaysShowHelperArea?: boolean;
  trailingComponent?: JSX.Element;
};

export const InputWrapper: React.FC<Props> = ({
  form,
  name,
  label,
  size,
  disabled,
  wrapperClassName,
  children,
  onClick = () => {},
  trailingComponent,
}) => {
  const errors = get(form.formState.errors, name, "");

  return (
    <div
      data-testid={`${name}-input-wrapper`}
      className="relative w-full flex flex-col"
      onClick={onClick}
    >
      <div className="flex flex-col gap-y-1">
        <label>
          <div className="flex justify-between">
            {label}
            {trailingComponent}
          </div>
          <div
            className={classNames(
              "input input-focus-within flex items-center gap-x-2 overflow-hidden relative",
              {
                "w-[500px]": size === "standard",
                "w-[305px] py-2": size === "short",
                "border-white-100 cursor-not-allowed": disabled,
                "border-red-100": errors,
                ...wrapperClassName,
              }
            )}
          >
            {children}
          </div>
        </label>
      </div>
    </div>
  );
};
