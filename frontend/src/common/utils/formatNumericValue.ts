import { Currency } from "common/types";

export type NumericValueType = "currency" | "number" | "percentage";
export type NotationType = "compact" | "standard";

const formatValue = (
  value: number,
  decimalsLength = 2,
  style: "decimal" | "percent" = "decimal"
): string =>
  new Intl.NumberFormat(navigator.language || "en", {
    style,
    notation: "compact",
    maximumFractionDigits: decimalsLength,
  }).format(value) || "";

export const formatCurrencyValue = (
  value: number,
  currency?: Currency,
  maximumFractionDigits = 2,
  notation: NotationType = "compact"
): string =>
  new Intl.NumberFormat(navigator.language || "en", {
    style: "currency",
    currency: currency || "USD",
    notation,
    maximumFractionDigits,
    currencyDisplay: (currency || "USD") === "USD" ? "narrowSymbol" : undefined,
  }).format(value) || "";

export const formatNumericValue = (
  type: NumericValueType,
  value: number,
  currency?: Currency,
  decimalsLength?: number,
  notation?: NotationType
): string => {
  switch (type) {
    case "currency":
      return formatCurrencyValue(value, currency, 2, notation);
    case "number":
      return formatValue(value, decimalsLength);
    case "percentage":
      return formatValue(value / 100, decimalsLength, "percent");
    default:
      return "";
  }
};
