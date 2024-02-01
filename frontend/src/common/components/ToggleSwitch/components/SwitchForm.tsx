import { useMemo } from "react";

import { TSwitch } from "../types";
import { SwitchBase } from "./SwitchBase";

type Props = TSwitch & {
  form: Pick<TSwitch, "form">;
  name: Pick<TSwitch, "name">;
  size: Pick<TSwitch, "size">;
};

export const SwitchForm: React.FC<Props> = ({
  form,
  name,
  valueOn,
  valueOff,
  onChange,
  ...props
}) => {
  const checked = useMemo(
    () => form.getValues(name) === valueOn,
    [form.getValues(name)]
  );
  const onChangeCustom = (value: boolean) => {
    if (onChange) {
      onChange(value);
    } else {
      form.setValue(name, value ? valueOn : valueOff);
    }
  };

  return <SwitchBase {...props} checked={checked} onChange={onChangeCustom} />;
};
