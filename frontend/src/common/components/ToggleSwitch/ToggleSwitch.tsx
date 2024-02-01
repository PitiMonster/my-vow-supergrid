import { SwitchBase } from "./components/SwitchBase";
import { SwitchForm } from "./components/SwitchForm";
import { TSwitch } from "./types";

export const ToggleSwitch: React.FC<TSwitch> = ({
  form,
  name,
  size = "medium",
  ...props
}) => {
  if (form && name)
    return <SwitchForm form={form} name={name} size={size} {...props} />;

  return <SwitchBase size={size} {...props} />;
};
