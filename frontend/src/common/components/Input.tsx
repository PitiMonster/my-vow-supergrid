import { useRef } from "react";

import { InputGeneric, InputWrapper } from "./components";
import { TInput } from "./types";

export const Input: React.FC<TInput> = ({
  form,
  name,
  label,
  showSkeleton,
  isReset,
  size,
  helperText,
  trailingComponent,
  hideHelperText = false,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <InputWrapper
      form={form}
      name={name}
      label={label}
      showSkeleton={showSkeleton}
      isReset={isReset}
      size={size}
      helperText={helperText}
      onClick={handleWrapperClick}
      hideHelperText={hideHelperText}
    >
      <InputGeneric form={form} name={name} {...inputProps} />
      {trailingComponent && trailingComponent}
    </InputWrapper>
  );
};
