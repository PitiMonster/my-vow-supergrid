import classNames from "classnames";
import { format, parse, startOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./style.scss";
import { getDateWithinRange } from "common/utils";

import { DatePickerParams } from "./types";
import { validateDatePattern } from "./utils";
import { Button } from "..";
import { InputDate } from "../InputDate";

export const DatePicker: React.FC<DatePickerParams> = ({
  form,
  dateFormat,
  monthsShown = 1,
  onCancel,
  onApply,
  minDate,
  maxDate,
  disableStart,
  disableEnd,
  ...props
}) => {
  const [selects, setSelects] = useState<"range" | "start" | "end">(
    !disableStart && !disableEnd ? "range" : disableStart ? "end" : "start"
  );
  const [selectedDay, setSetSelectedDay] = useState<Date | null>(null);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  const { lower, upper, selector } = form.getValues();

  const onChangeDate = (
    date: Date | [Date | null, Date | null] | null,
    change: "range" | "start" | "end" | null = null
  ) => {
    const whatToChange = change ?? selects;
    form.clearErrors();
    setShowMonthYearPicker(false);
    // Selects range
    if (Array.isArray(date)) {
      const [start, end] = date;
      form.setValue(
        "lower",
        start
          ? format(
              getDateWithinRange(start, { min: minDate, max: maxDate }),
              dateFormat
            )
          : ""
      );
      form.setValue(
        "upper",
        end
          ? format(
              getDateWithinRange(end, { min: minDate, max: maxDate }),
              dateFormat
            )
          : ""
      );
      form.setValue("selector", undefined);
      setSetSelectedDay(null);
    }
    // Selects start/end
    else if (whatToChange !== "range") {
      const newDate = date
        ? getDateWithinRange(date, { min: minDate, max: maxDate })
        : null;
      const otherDateToCompare = whatToChange === "start" ? upper : lower;
      if (
        newDate &&
        otherDateToCompare &&
        !validateDatePattern(otherDateToCompare) &&
        (whatToChange === "start"
          ? newDate.getTime() >
            parse(otherDateToCompare, dateFormat, new Date()).getTime()
          : newDate.getTime() <
            parse(otherDateToCompare, dateFormat, new Date()).getTime())
      ) {
        form.setValue(
          "lower",
          whatToChange === "start" ? upper || "" : format(newDate, dateFormat)
        );
        form.setValue(
          "upper",
          whatToChange === "start" ? format(newDate, dateFormat) : lower || ""
        );
      } else {
        form.setValue(
          whatToChange === "start" ? "lower" : "upper",
          newDate ? format(newDate, dateFormat) : ""
        );
      }
      if (newDate && !disableStart && !disableEnd) setSelects("range");
      setSetSelectedDay(null);
      form.setValue("selector", undefined);
    }
  };

  const selectDay = (date: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(date)) setSetSelectedDay(date[0] ?? date[1]);
    else setSetSelectedDay(date);
    setShowMonthYearPicker(false);
  };

  // useEffect(
  //   () =>
  //     setSetSelectedDay(lower ? parse(lower!, dateFormat, new Date()) : null),
  //   [selector]
  // );

  return (
    <div>
      <div
        className={classNames("flex", {
          "gap-x-7 w-[740px]": monthsShown > 1,
          "gap-x-[10px] w-[351px]":
            !monthsShown || (monthsShown === 1 && props.quickFiltersLayout),
          "gap-x-[10px] w-[420px] flex-col":
            !monthsShown || (monthsShown === 1 && !props.quickFiltersLayout),
        })}
      >
        <InputDate
          form={form}
          name="lower"
          dateFormat={dateFormat}
          label="start date"
          onFocus={() => setSelects("start")}
          onChange={(date) => {
            setSelects("start");
            onChangeDate(date, "start");
          }}
          registerOptions={{
            required: selector !== "lifetime",
            validate: { validateDatePattern },
          }}
          disabled={disableStart}
        />
        <InputDate
          form={form}
          name="upper"
          dateFormat={dateFormat}
          label="end date"
          onFocus={() => setSelects("end")}
          onChange={(date) => {
            setSelects("end");
            onChangeDate(date, "end");
          }}
          registerOptions={{
            required: selector !== "lifetime",
            validate: { validateDatePattern },
          }}
          disabled={disableEnd}
        />
      </div>
      <div className="flex w-full justify-center">
        <ReactDatePicker
          onChange={(date) => {
            if (showMonthYearPicker) selectDay(date);
            else onChangeDate(date);
          }}
          monthsShown={showMonthYearPicker ? 1 : monthsShown}
          showMonthYearPicker={showMonthYearPicker}
          showFourColumnMonthYearPicker
          focusSelectedMonth
          forceShowMonthNavigation
          calendarStartDay={1}
          formatWeekDay={(day) => day.slice(0, 3)}
          selected={selectedDay}
          selectsRange={
            selects === "range" &&
            !showMonthYearPicker &&
            !disableStart &&
            !disableEnd
          }
          selectsStart={
            (selects === "start" && !showMonthYearPicker) ||
            (!disableStart && disableEnd)
          }
          selectsEnd={
            (selects === "end" && !showMonthYearPicker) ||
            (!disableEnd && disableStart)
          }
          minDate={
            showMonthYearPicker && minDate ? startOfMonth(minDate) : minDate
          }
          maxDate={maxDate}
          renderCustomHeader={({
            monthDate,
            customHeaderCount,
            decreaseMonth,
            increaseMonth,
            increaseYear,
            decreaseYear,
          }) => (
            <div
              className={classNames("", {
                "w-[350px]": props.quickFiltersLayout || monthsShown > 1,
                "w-[420px]":
                  !monthsShown ||
                  (monthsShown === 1 && !props.quickFiltersLayout),
              })}
            >
              <button
                aria-label="Previous Month"
                className={classNames(
                  "react-datepicker__navigation react-datepicker__navigation--previous",
                  {
                    invisible:
                      customHeaderCount === 1 &&
                      monthsShown > 1 &&
                      !showMonthYearPicker,
                  }
                )}
                onClick={showMonthYearPicker ? decreaseYear : decreaseMonth}
              />
              <button
                onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
              >
                <span className="react-datepicker__current-month">
                  {monthDate.toLocaleString(
                    "en-US",
                    showMonthYearPicker
                      ? { year: "numeric" }
                      : {
                          month: "long",
                          year: "numeric",
                        }
                  )}
                </span>
              </button>
              <button
                aria-label="Next Month"
                className={classNames(
                  "react-datepicker__navigation react-datepicker__navigation--next",
                  {
                    invisible:
                      customHeaderCount === 0 &&
                      monthsShown > 1 &&
                      !showMonthYearPicker,
                  }
                )}
                onClick={showMonthYearPicker ? increaseYear : increaseMonth}
              />
            </div>
          )}
          {...props}
        />
      </div>
      <div className="flex justify-end items-center gap-x-[10px] w-full">
        <Button
          styling="blue-outline-button"
          additionalClasses="px-8 py-[10px]"
          onClick={onCancel}
          dataTestId="cancel"
        >
          Cancel
        </Button>
        <Button
          styling="blue-button"
          additionalClasses="px-8 py-[10px]"
          onClick={onApply}
          dataTestId="apply"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
