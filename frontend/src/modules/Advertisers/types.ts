import {
  TableQueryParams,
  Country,
  SupportedCountry,
  Currency,
  Pagination,
  QuestionAnswer,
  PhoneNumberForm,
  PartialNull,
  Channel,
} from "common/types";

export const advertiserStatusList = [
  "Pending",
  "Approved",
  "Disabled",
] as const;
export type AdvertiserStatus = typeof advertiserStatusList[number];
export type AdvertiserHiddenStatus = "To Create";

export type AdvertisersQueryParams = Partial<TableQueryParams> & {
  market?: string;
  status?: AdvertiserStatus[] | undefined;
};

export type GetAdvertisersQueryParams = Partial<TableQueryParams> & {
  market?: string;
  status?: string;
};

export type ListAdvertiser = {
  id: string;
  name: string;
  countries: SupportedCountry[];
  status: AdvertiserStatus | AdvertiserHiddenStatus;
  total_spend: string;
  account_balance: string;
  primary_currency: Currency;
  contact_name: string;
  contact_surname: string;
  contact_email: string;
};

export type AdvertisersListResponse = Pagination<ListAdvertiser>;

/**
 * Create / edit advertiser
 */

export type Industries = Record<string, string[]>;

export type NewAdvertiserDetails = {
  name: string;
  slug?: string;
  status?: AdvertiserStatus | AdvertiserHiddenStatus;
  company_url: string;
  primary_currency: Currency;
  agency_fee: string;
  approved_credit: QuestionAnswer;
  credit?: string;
  industry: string;
  sub_industry?: string | null;
  channels: Channel[];
};

export const newAdvertiserDetailsFieldNames: (keyof NewAdvertiserDetails)[] = [
  "name",
  "slug",
  "status",
  "company_url",
  "primary_currency",
  "agency_fee",
  "approved_credit",
  "credit",
  "industry",
  "sub_industry",
  "channels",
];

export type NewAdvertiserContactPerson = {
  contact_name: string;
  contact_surname: string;
  contact_email: string;
  contact_phone: PhoneNumberForm;
};

export const newAdvertiserContactPersonFieldNames: (keyof NewAdvertiserContactPerson)[] =
  ["contact_name", "contact_surname", "contact_email", "contact_phone"];

export type AdvertiserContactAddress = {
  contact_entity_name: string;
  contact_address_line1: string;
  contact_address_line2: string | null;
  contact_address_city: string;
  contact_address_country: Country;
  contact_address_code: string;
};

export const newAdvertiserContactAddressFieldNames: (keyof AdvertiserContactAddress)[] =
  [
    "contact_entity_name",
    "contact_address_line1",
    "contact_address_line2",
    "contact_address_city",
    "contact_address_country",
    "contact_address_code",
  ];

export type AdvertiserBillingAddress = {
  billing_entity_name: string;
  billing_address_line1: string;
  billing_address_line2?: string;
  billing_address_city: string;
  billing_address_country: Country;
  billing_address_code: string;
};

export const newAdvertiserBillingAddressFieldNames: (keyof AdvertiserBillingAddress)[] =
  [
    "billing_entity_name",
    "billing_address_line1",
    "billing_address_line2",
    "billing_address_city",
    "billing_address_country",
    "billing_address_code",
  ];

export type TNewAdvertiser = NewAdvertiserDetails &
  NewAdvertiserContactPerson &
  AdvertiserContactAddress &
  AdvertiserBillingAddress & { billing_matches_contact: boolean };

export type NewAdvertiserPayload = Omit<
  NewAdvertiserDetails,
  "approved_credit"
> &
  Omit<NewAdvertiserContactPerson, "contact_phone"> &
  AdvertiserContactAddress &
  PartialNull<AdvertiserBillingAddress> & {
    billing_matches_contact: boolean;
    contact_phone: string;
    contact_phone_country_code: string;
    approved_credit: number;
  };

export type GetAdvertiserResponse = Required<NewAdvertiserPayload> &
  Pick<ListAdvertiser, "id" | "countries" | "total_spend" | "account_balance">;

/**
 * End of create / edit advertiser
 */

export type AdvertiserDetails = GetAdvertiserResponse;
