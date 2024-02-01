import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { countries, metrics, timezones } from "common/consts";
import Currencies from "common/utils/currencies.json";

export type Currency = keyof typeof Currencies;
export type ExchangeRates = Record<Currency, number>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Advertiser = {
  id: string;
  name: string;
  countries: SupportedCountry[];
  currencies: string[];
  primary_currency: Currency;
  creatives_languages: Partial<Record<Language, Country[]>>;
  exchange_rates: ExchangeRates;
};

export type User = {
  id: string;
  email: string; // Email is unique
  name?: string;
  surname?: string;
  advertiser_accounts: Advertiser[];
};
export type UserFilter = {
  id: string;
  name: string;
};

export type ContextUser = User;

export const userRoleAdvertiserList = [
  "Read Only",
  "Report Only",
  "Client Regular",
  "Client Manager",
] as const;
export type UserRoleAdvertiser = typeof userRoleAdvertiserList[number];

export const userRoleAgencyList = [
  "Agency Junior",
  "Agency Regular",
  "Agency Manager",
] as const;
export type UserRoleAgency = typeof userRoleAgencyList[number];

export const userRoleList = [
  ...userRoleAdvertiserList,
  ...userRoleAgencyList,
] as const;
export type UserRole = typeof userRoleList[number] | "ADMINISTRATOR";

export const userTypeList = ["agency", "advertiser"] as const;
export type UserType = typeof userTypeList[number];

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// Element -> HTMLElement | SVGElement | … -> HTMLDivElement | SVGSVGElement | …
export type EventDefault<T = Event> = (event: T) => void;
export type OnClickDefault<T = Element> = EventDefault<React.MouseEvent<T>>;
export type OnChangeDefault<T = Element> = EventDefault<React.ChangeEvent<T>>;
export type OnSelectDefault<T = Element> = EventDefault<React.ChangeEvent<T>>;
export type OnBlurDefault<T = Element> = EventDefault<React.FocusEvent<T>>;
export type OnFocusDefault<T = Element> = EventDefault<React.FocusEvent<T>>;
export type OnKeyboardEventDefault<T = Element> = EventDefault<
  React.KeyboardEvent<T>
>;

export type CallbackDefault = () => void;
export type PromiseCallbackDefault = () => Promise<void>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbackSomeData<T = any> = (data?: T) => void;

export type AnyObject = Record<string, any>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ValueOf<T> = T[keyof T];

export type PartialNull<T> = { [P in keyof T]: T[P] | null };

export type Stringify<T> = { [P in keyof T]: string };

export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

export type UseQueryOptionsResponse<T> = UseQueryOptions<AxiosResponse<T>>;

export type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type DateRange = {
  lower: string;
  upper: string;
  bounds?: string;
  timezone?: string;
};

export const questionAnswers = ["yes", "no"] as const;
export type QuestionAnswer = typeof questionAnswers[number];
export type PhoneNumber = {
  id: string;
  dial: string;
  countryName: string;
  countryCode: Country;
};
export type PhoneNumberForm = {
  number: string;
  data: PhoneNumber;
};

/**
 * Countries and Regions
 */

export const northAmericaCountriesList = ["US", "MX", "CA"] as const;
export type NorthAmericaCountry = typeof northAmericaCountriesList[number];

export const southAmericaCountriesList = ["BR"] as const;
export type SouthAmericaCountry = typeof southAmericaCountriesList[number];

export const middleEastCountriesList = ["AE", "SA"] as const;
export type MiddleEastCountry = typeof middleEastCountriesList[number];

export const europeCountriesList = [
  "GB",
  "FR",
  "DE",
  "ES",
  "IT",
  "SE",
  "TR",
] as const;
export type EuropeCountry = typeof europeCountriesList[number];

export const apacCountriesList = ["AU", "IN", "SG", "JP"] as const;
export type ApacCountry = typeof apacCountriesList[number];

export const supportedCountries = [
  ...northAmericaCountriesList,
  ...southAmericaCountriesList,
  ...middleEastCountriesList,
  ...europeCountriesList,
  ...apacCountriesList,
] as const;

export type SupportedCountry = typeof supportedCountries[number];

export type Country = typeof countries[number];

export const regionsList = [
  "north_america",
  "south_america",
  "middle_east",
  "europe",
  "apac",
] as const;
export type Region = typeof regionsList[number];

export const countriesMap: Record<Region, Readonly<SupportedCountry[]>> = {
  north_america: northAmericaCountriesList,
  south_america: southAmericaCountriesList,
  middle_east: middleEastCountriesList,
  europe: europeCountriesList,
  apac: apacCountriesList,
};

// boolean because react-use-form sets false value for unchecked checkboxes
export type CountriesForm = Record<
  SupportedCountry,
  SupportedCountry | boolean
>;

export const languages = [
  "English",
  "Dutch",
  "French",
  "German",
  "Czech",
  "Polish",
  "Turkish",
  "Italian",
  "Spanish",
  "Portuguese",
  "Arabic",
  "Japanese",
  "Chinese",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Marathi",
  "Swedish",
  "Norwegian",
  "Finnish",
  "Danish",
] as const;
export type Language = typeof languages[number];

/**
 * End of Countries and Regions
 */

export const ErrorsModal = {
  500: "500",
  404: "404",
  429: "429",
  unexpectedError: "unexpectedError",
} as const;
export type ErrorsModalType = typeof ErrorsModal[keyof typeof ErrorsModal];

export type Timezone = typeof timezones[number];

export type Subheader = {
  id: string;
  isSelected: boolean;
  isVisible: boolean;
  header: string;
  searchValue: string;
  label?: string | JSX.Element;
};

/**
 * Date picker
 */

export type CalendarParams = {
  lower?: Date;
  upper?: Date;
  selector?: Period;
};

export type FilterCalendarParamsForm = {
  lower: string;
  upper: string;
  selector?: Period;
};

export type CalendarParamsForm = Partial<FilterCalendarParamsForm>;

export const periods = [
  "last7d",
  "mtd",
  "lastWeek",
  "lastMonth",
  "lastQuarter",
  "lifetime",
] as const;

export type Period = typeof periods[number];

/**
 * End of Date Picker
 */

/**
 * Metrics
 */
export type Metric = typeof metrics[number];
export type Metrics = {
  fdr: string | null;
  fdi: string | null;
  dcpm: string | null;
  vcpm: string | null;
  clicks: string | null;
  ctr: string | null;
  impressions: number | null;
  conversions: number | null;
  sales: string | null;
  roas: string | null;
  acos: string | null;
  pacing: string | null;
  spend: string | null;
  cpa: string | null;
  cvr: string | null;
  vr: string | null;
  vi: string | null;
  vcr: string | null;
  cvc: string | null;
  click_throughs: number | null;
  off_amazon_cpa: string | null;
  off_amazon_cvr: string | null;
  total_cost: string | null;
  viewable_impressions: number | null;
  ecpc: string | null;
  ecpm: string | null;
  total_sales: string | null;
};

/**
 * End of Metrics
 */

export const strategyCurrencyTypes = ["primary", "market"] as const;
export type StrategyCurrencyType = typeof strategyCurrencyTypes[number];

export type TableQueryParams = {
  page_size?: number;
  page?: number;
  search?: string;
  ordering?: string;
  markets?: string;
  formats?: string;
  group_by?: string;
  include_archived?: boolean;
  no_pagination?: boolean;
  metrics_date_range?: string;
  currency_type?: StrategyCurrencyType;
};

export const channelsList = [
  "dsp",
  "twitch",
  "fire_tv",
  "freevee",
  "sponsored_display",
  "sponsored_products",
  "sponsored_brands",
] as const;
export type Channel = typeof channelsList[number];

export const formatsList = [
  "standard_display",
  "video",
  "aap_mobile_app",
  "amazon_mobile_display",
] as const;
export type Format = typeof formatsList[number];

export const campaignStatusList = [
  "1_delivering",
  "2_out_of_budget",
  "3_ended",
  "4_not_running",
  "5_ready_to_deliver",
  "6_inactive",
] as const;

export type CampaignStatus = typeof campaignStatusList[number];
