/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

import { Currency } from "common/types";

export type TInputGeneric = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "form" | "size"
> & {
  form: UseFormReturn<any>;
  name: string;
  registerOptions?: RegisterOptions;
  assignRef?: (e: HTMLInputElement | null) => void;
};

export const inputSizes = ["standard", "short"] as const;
export type TInputSize = typeof inputSizes[number];

export type TInputWrapper = {
  form: UseFormReturn<any>;
  name: string;
  label: string | JSX.Element;
  showSkeleton?: boolean;
  isReset?: boolean;
  size?: TInputSize;
  helperText?: string;
  wrapperClassName?: Record<string, boolean>;
  disabled?: boolean;
  onClick?: () => void;
  hideHelperText?: boolean;
};

export type TInput = TInputGeneric & {
  label: string | JSX.Element;
  iconPosition?: "start" | "end";
  onIconClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  showSkeleton?: boolean;
  isReset?: boolean;
  size?: TInputSize;
  helperText?: string;
  trailingComponent?: JSX.Element;
  hideHelperText?: boolean;
};

export type TInputNumeric = Omit<TInput, "icon"> & {
  symbol: string;
};

export type TInputCurrency = Omit<TInput, "icon"> & {
  currency?: Currency;
};

export type TInputPhoneNumber = Omit<TInput, "icon">;

export type TInputInlineEdit = Omit<TInput, "icon"> & {
  onSaveAction: () => Promise<boolean | void>;
  setEditMode: (state: boolean) => void;
  prefixEditElement?: JSX.Element | JSX.Element[];
  isLoading?: boolean;
};
