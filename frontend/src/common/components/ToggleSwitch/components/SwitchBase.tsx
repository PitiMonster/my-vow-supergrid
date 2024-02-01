/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Switch, SwitchProps } from "@headlessui/react";
import classNames from "classnames";

import { TSwitch } from "../types";

type Props = SwitchProps<"button"> & {
  testId: TSwitch["testId"];
  size: TSwitch["size"];
};

export const SwitchBase: React.FC<Props> = ({
  checked,
  disabled,
  testId,
  size,
  ...props
}) => (
  <div onClick={(e) => e.stopPropagation()}>
    <Switch
      {...props}
      checked={checked}
      disabled={disabled}
      className={classNames(
        "relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
        {
          "bg-blue-300": checked && !disabled,
          "bg-gray-700": !checked && !disabled,
          "cursor-not-allowed opacity-80 bg-white-750": disabled,
          "cursor-pointer": !disabled,
          "h-[34px] w-[66px]": size === "large",
          "h-5 w-8": size === "medium",
        }
      )}
      data-testid={`${testId}-switch`}
    >
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none inline-block transform rounded-full bg-white ring-0 transition duration-200 ease-in-out",
          {
            "h-[30px] w-[30px]": size === "large",
            "h-4 w-4": size === "medium",
            "translate-x-0": !checked,
            "translate-x-8": size === "large" && checked,
            "translate-x-3": size === "medium" && checked,
          }
        )}
      />
    </Switch>
  </div>
);
