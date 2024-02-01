import { RegisterOptions, UseFormReturn } from "react-hook-form";

export type TSwitch = {
  testId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn<any>;
  name?: string;
  size?: "medium" | "large";
  valueOn?: string;
  valueOff?: string;
  onChange?: (value: boolean) => void;
  registerOptions?: RegisterOptions;
  disabled?: boolean;
  checked?: boolean;
};
