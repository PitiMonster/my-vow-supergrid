import classNames from "classnames";
import { parse } from "date-fns";

import { validateDatePattern } from "./DatePicker/utils";
import { Input } from "./Input";
import { TInput } from "./types";

type Props = Omit<TInput, "onChange" | "onBlur"> & {
  dateFormat: string;
  onFocus: () => void;
  onChange: (date: Date | null) => void;
};

export const InputDate: React.FC<Props> = ({
  form,
  name,
  dateFormat,
  onFocus,
  onChange,
  ...props
}) => {
  const { [name]: formValue } = form.getValues();

  const changeValue = (value: string) => {
    const isInvalid = validateDatePattern(value);

    if (isInvalid) {
      form.setError(name, {
        message: isInvalid,
      });
      return;
    }

    if (value !== formValue)
      onChange(value ? parse(value, dateFormat, new Date()) : null);
  };

  return (
    <Input
      form={form}
      name={name}
      onFocus={onFocus}
      onChange={() => {}}
      onBlur={(e) => changeValue(e.target.value)}
      autoComplete="off"
      {...props}
      trailingComponent={
        <button
          className={classNames({
            invisible: !formValue,
          })}
          onClick={() => changeValue("")}
        >
          close
        </button>
      }
    />
  );
};
