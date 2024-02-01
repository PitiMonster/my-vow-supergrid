/**
 * This is place to keep all route paths we use across the project.
 * It should be always full paths so it is consisten to use and easy to compare.
 *  - ROOT postfix represents main pathes that are used by load balancer in backend integration;
 *  - INDEX postfix represents main pages, sometimes lists, that has reference on navigation or subnavigation;
 *  - DETAIL postfix represents entity main pages;
 *  - CREATE postfix represents entity creation pages;
 *  - UPDATE postfix represents entity update pages;
 *
 * Keep the pattern where DETAIL/CREATE/INDEX pages are build on top of INDEX
 */

export const DEFAULT = "/";
export const ANY_OTHER = "*";

export const MENU = "/menu";
export const SUPERGRID_EXAMPLE = "/supergrid";

/**
 * STRATEGIES
 */
export const STRATEGY_ROOT = "/strategies";
export const STRATEGY_INDEX = STRATEGY_ROOT;
export const STRATEGY_DETAIL = "/strategies/:strategyId";
export const STRATEGY_DETAIL_OVERVIEW = "/strategies/:strategyId/overview";
export const STRATEGY_DETAIL_CAMPAIGNS =
  "/strategies/:strategyId/overview/campaigns/:campaignId";

export const strategyIndexRoutes = [STRATEGY_INDEX];

/**
 * ADMINISTRATION
 */
export const ADMIN_ROOT = "/administration";
export const ADMIN_ADVERTISER_INDEX = "/administration/advertisers";

export const adminIndexRoutes = [ADMIN_ADVERTISER_INDEX];

/**
 * AUTH
 * TODO: add AUTH_ROOT
 */
export const LOGIN = "/login";
export const LOGOUT = "/logout";
