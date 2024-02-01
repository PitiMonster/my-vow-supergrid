import { ReactDatePickerProps } from "react-datepicker";
import { UseFormReturn } from "react-hook-form";

import {
  CalendarParamsForm,
  FilterCalendarParamsForm,
  Period,
} from "common/types";

export type DatePickerParams = Omit<
  ReactDatePickerProps<never, boolean>,
  "onChange" | "locale"
> & {
  form:
    | UseFormReturn<CalendarParamsForm>
    | UseFormReturn<FilterCalendarParamsForm>;
  dateFormat: string;
  onCancel: () => void;
  onApply: () => void;
  disabledCalendarInfo?: string;
  disabledDayInfo?: string;
  quickFiltersLayout?: boolean;
  disableStart?: boolean;
  disableEnd?: boolean;
};

export type Selector = {
  id: Period;
  range: () => { lower?: Date; upper?: Date };
};
