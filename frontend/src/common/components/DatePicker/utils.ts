import { parse } from "date-fns";

import { DEFAULT_DATE_FORMAT } from "common/consts";

export const getTimeZoneInfo = (date: Date) => {
  const utcOffsetMinutes = date.getTimezoneOffset();
  const timezoneName = Intl.DateTimeFormat("en", {
    timeZoneName: "long",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  const utcOffsetHours = Math.abs(Math.floor(utcOffsetMinutes / 60));
  const utcOffsetMinutesRemainder = Math.abs(utcOffsetMinutes % 60);
  const sign = utcOffsetMinutes > 0 ? "-" : "+";

  return `UTC ${sign}${utcOffsetHours
    .toString()
    .padStart(2, "0")}:${utcOffsetMinutesRemainder
    .toString()
    .padStart(2, "0")} (${timezoneName})`;
};

export const validateDatePattern = (value: string) => {
  try {
    if (!value) {
      return;
    }
    const parsedDate = parse(value, DEFAULT_DATE_FORMAT, new Date());
    const isValidDate = !Number.isNaN(parsedDate?.getTime());
    if (!isValidDate) {
      return "invalid date format";
    }
  } catch {
    return "invalid date format";
  }
};
