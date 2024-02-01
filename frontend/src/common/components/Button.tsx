/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from "classnames";
import kebabCase from "lodash/kebabCase";
import React, { useState } from "react";

export type ButtonProps = {
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "xlarge" | "";
  type?: "button" | "submit" | "reset" | undefined;
  additionalClasses?: string;
  childrenClasses?: string;
  styling?:
    | "blue-button"
    | "blue-outline-button"
    | "red-outline-button"
    | "plain-button"
    | "plain-outline-button"
    | "";
  dataTestId: string;
};

export const Button: React.FC<React.PropsWithChildren & ButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
  additionalClasses,
  childrenClasses,
  styling = "",
  loading = false,
  size = "medium",
  dataTestId,
}) => {
  const [processingOnClick, setProcessingOnClick] = useState(false);

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setProcessingOnClick(true);
    try {
      await onClick(e);
    } finally {
      setProcessingOnClick(false);
    }
  };

  return (
    <button
      className={`relative text-14 transition-colors duration-300 rounded-[5px] flex items-center justify-center gap-x-2 ${additionalClasses} ${styling} ${size}`}
      onClick={handleOnClick}
      disabled={disabled || processingOnClick}
      type={type}
      data-testid={`${kebabCase(dataTestId)}-button`}
    >
      <>
        {children && (
          <div
            className={classNames(
              `first-letter:capitalize ${childrenClasses}`,
              {
                invisible: loading,
              }
            )}
          >
            {children}
          </div>
        )}
      </>
    </button>
  );
};
