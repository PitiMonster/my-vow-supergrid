import { format, parse } from "date-fns";

import {
  DEFAULT_BACKEND_DATE_FORMAT,
  DEFAULT_DATE_FORMAT,
} from "common/consts";
import { CalendarParams, CalendarParamsForm } from "common/types";

export const parseDateRange = (calendar: CalendarParams) => {
  const dateFormat = DEFAULT_BACKEND_DATE_FORMAT;

  return calendar?.selector === "lifetime" || !calendar
    ? ""
    : `${calendar.lower ? format(calendar.lower, dateFormat) : ""},${
        calendar.upper ? format(calendar.upper, dateFormat) : ""
      }`;
};

export const parseDateArrayIntoRequest = (dateArray: [Date, Date]) => {
  const dateFormat = DEFAULT_BACKEND_DATE_FORMAT;

  return `${dateArray[0] ? format(dateArray[0], dateFormat) : ""},${
    dateArray[1] ? format(dateArray[1], dateFormat) : ""
  }`;
};

export const parseDateRangeIntoForm = (
  dateRange: CalendarParams,
  dateFormat = DEFAULT_DATE_FORMAT
) => ({
  ...dateRange,
  lower: dateRange.lower ? format(dateRange.lower, dateFormat) : "",
  upper: dateRange.upper ? format(dateRange.upper, dateFormat) : "",
});

export const parseFormObjectIntoDateRange = (
  formObject: CalendarParamsForm,
  dateFormat = DEFAULT_DATE_FORMAT
) => ({
  ...formObject,
  lower: formObject.lower
    ? parse(formObject.lower, dateFormat, new Date())
    : undefined,
  upper: formObject.upper
    ? parse(formObject.upper, dateFormat, new Date())
    : undefined,
});

export const getDateWithinRange = (
  date: Date,
  range: { min?: Date | null; max?: Date | null }
) => {
  if (range.min && date.getTime() < range.min.getTime()) return range.min;
  if (range.max && date.getTime() > range.max.getTime()) return range.max;
  return date;
};

export const getDateRangeSearchParams = ({
  searchParams,
}: { searchParams?: URLSearchParams } = {}) => {
  const params = searchParams || new URLSearchParams(window.location.search);
  const dateRange = params.get("dateRange");

  const isInvalidId = [null, "null", ""].includes(dateRange);

  return isInvalidId ? null : dateRange;
};

export const getGlobalDateRangeWithinSpecificRange = (
  globalDateRange: CalendarParams,
  minDate?: Date,
  maxDate?: Date
): CalendarParams => {
  let newDateRangeObject: CalendarParams = { ...globalDateRange };
  if (globalDateRange.selector !== "lifetime") {
    if (
      minDate &&
      globalDateRange.lower &&
      minDate.getTime() > globalDateRange.lower.getTime()
    ) {
      newDateRangeObject = {
        ...newDateRangeObject,
        lower: minDate,
        selector: undefined,
      };
    }
    if (
      maxDate &&
      globalDateRange.upper &&
      maxDate.getTime() < globalDateRange.upper.getTime()
    ) {
      newDateRangeObject = {
        ...newDateRangeObject,
        upper: maxDate,
        selector: undefined,
      };
    }
    if (
      (maxDate &&
        globalDateRange.lower &&
        maxDate.getTime() < globalDateRange.lower.getTime()) ||
      (minDate &&
        globalDateRange.upper &&
        minDate.getTime() > globalDateRange.upper.getTime())
    ) {
      newDateRangeObject = {
        ...newDateRangeObject,
        lower: undefined,
        upper: undefined,
        selector: "lifetime",
      };
    }
  }
  return newDateRangeObject;
};
