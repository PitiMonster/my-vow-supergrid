import {
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
} from "date-fns";

import { Selector } from "./types";

export const predefinedSelectors: Selector[] = [
  {
    id: "last7d",
    range: () => ({
      lower: subDays(new Date(), 6),
      upper: new Date(),
    }),
  },
  {
    id: "mtd",
    range: () => ({
      lower: startOfMonth(new Date()),
      upper: new Date(),
    }),
  },
  {
    id: "lastWeek",
    range: () => ({
      lower: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      upper: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    }),
  },
  {
    id: "lastMonth",
    range: () => ({
      lower: startOfMonth(subMonths(new Date(), 1)),
      upper: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    id: "lastQuarter",
    range: () => ({
      lower: startOfQuarter(subQuarters(new Date(), 1)),
      upper: endOfQuarter(subQuarters(new Date(), 1)),
    }),
  },
  {
    id: "lifetime",
    range: () => ({}),
  },
];
