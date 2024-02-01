import classNames from "classnames";

import { TInputGeneric } from "../types";

export const InputGeneric: React.FC<TInputGeneric> = ({
  form,
  name,
  registerOptions,
  assignRef = () => {},
  onBlur: onBlurAction,
  ...inputProps
}) => {
  const { onChange, ref, ...formProps } = form.register(name, {
    ...registerOptions,
    onBlur: onBlurAction,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.clearErrors(name);
    onChange(e);
  };

  return (
    <input
      className={classNames(
        "w-full bg-transparent disabled:cursor-not-allowed text-14 focus-visible:none",
        {
          "text-gray-750 border-gray-750": inputProps.disabled,
        }
      )}
      {...inputProps}
      {...formProps}
      ref={(e) => {
        ref(e);
        assignRef(e);
      }}
      onChange={inputProps.onChange ?? onInputChange}
      data-testid={`${name}-input`}
      value={inputProps.value}
      onWheel={(e) => e.currentTarget.blur()}
    />
  );
};
