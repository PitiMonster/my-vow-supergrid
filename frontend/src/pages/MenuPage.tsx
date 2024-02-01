import * as routes from "App/AppRouter/routes";

import { useNavigateWithAdvertiser } from "common/hooks";

export const MenuPage = () => {
  const navigate = useNavigateWithAdvertiser();

  return (
    <ul>
      <li>
        <button onClick={() => navigate(routes.STRATEGY_ROOT)}>
          Strategies
        </button>
      </li>
      <li>
        <button onClick={() => navigate(routes.ADMIN_ADVERTISER_INDEX)}>
          Advertisers
        </button>
      </li>
      <li>
        <button onClick={() => navigate(routes.SUPERGRID_EXAMPLE)}>
          Example
        </button>
      </li>
      <li>
        <button onClick={() => navigate(routes.LOGOUT)}>Logout</button>
      </li>
    </ul>
  );
};
