/* eslint-disable @typescript-eslint/no-non-null-assertion */
import classNames from "classnames";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

import { DEFAULT_DATE_FORMAT } from "common/consts";
import {
  CalendarParamsForm,
  FilterCalendarParamsForm,
  Period,
} from "common/types";

import { predefinedSelectors } from "../consts";
import { Selector } from "../types";

type Props = {
  form:
    | UseFormReturn<CalendarParamsForm>
    | UseFormReturn<FilterCalendarParamsForm>;
  dateFormat: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  styling?: "default" | "compact";
  selectedSelectors?: Period[];
};

export const QuickSelectors: React.FC<Props> = ({
  form,
  dateFormat,
  minDate,
  maxDate,
  styling = "default",
  selectedSelectors,
}) => {
  const { lower, upper, selector: formSelector } = form.getValues();

  const isSelectorSelected = useCallback(
    (selector: Selector) => formSelector && formSelector === selector.id,
    [formSelector, lower, upper]
  );

  const isSelectorOutOfRange = useCallback(
    (selector: Selector) =>
      (selector.range().lower &&
        maxDate &&
        selector.range().lower!.getTime() > maxDate?.getTime()) ||
      (selector.range().upper &&
        minDate &&
        selector.range().upper!.getTime() < minDate?.getTime()),
    [minDate, maxDate]
  );

  const setSelector = (selector: Selector) => {
    form.setValue("selector", selector.id);
    form.setValue(
      "lower",
      selector.range().lower ? format(selector.range().lower!, dateFormat) : ""
    );
    form.setValue(
      "upper",
      selector.range().upper ? format(selector.range().upper!, dateFormat) : ""
    );
    form.clearErrors();
  };

  return (
    <div className="flex flex-col gap-y-[10px]">
      {predefinedSelectors
        .filter((s) =>
          selectedSelectors ? selectedSelectors?.includes(s.id) : true
        )
        .map((selector: Selector) => (
          <button
            key={selector.id}
            className={classNames(
              "flex flex-col py-2 px-5 border-[1px] rounded-[5px] disabled:cursor-not-allowed	disabled:bg-white-400",
              {
                "border-white": !isSelectorSelected(selector),
                "border-blue-500 bg-white-600": isSelectorSelected(selector),
              }
            )}
            disabled={!!isSelectorOutOfRange(selector)}
            onClick={() => setSelector(selector)}
          >
            <p
              className={classNames("text-blue-800 font-semibold", {
                "text-gray-800": isSelectorOutOfRange(selector),
              })}
            >
              {selector.id}
            </p>
            {selector.id !== "lifetime" && styling !== "compact" && (
              <p
                className={classNames("text-gray-800 text-12 lowercase", {
                  "text-gray-800": isSelectorOutOfRange(selector),
                })}
              >
                {selector.range().lower &&
                  format(selector.range().lower!, DEFAULT_DATE_FORMAT)}{" "}
                -{" "}
                {selector.range().upper
                  ? selector.range().upper?.getTime() === new Date().getTime()
                    ? "present"
                    : format(selector.range().upper!, DEFAULT_DATE_FORMAT)
                  : "present"}
              </p>
            )}
          </button>
        ))}
    </div>
  );
};
