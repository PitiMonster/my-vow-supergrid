import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useNavigateWithAdvertiser } from "common/hooks";
import { Advertiser } from "common/types";
import {
  UserContext,
  defaultAdvertiser,
  getInitialAdvertiser,
} from "common/utils";

export const useAdvertiserSetup = () => {
  const { user, setUser, advertiser, setAdvertiser } = useContext(UserContext);
  const navigate = useNavigateWithAdvertiser();
  const [searchParams, setSearchParams] = useSearchParams();

  const setAdvetiserIdSearchParam = (id: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set("aid", id);
        return searchParams;
      },
      { replace: true }
    );
  };

  const setAdvertiserContext = (advertiserId?: string) => {
    if (!user) return;
    const newAdevertiserId =
      advertiserId ??
      getInitialAdvertiser(
        user.advertiser_accounts,
        user.email,
        undefined,
        searchParams
      ).id;
    // When advertiser ID changes, update the context data
    if (newAdevertiserId && newAdevertiserId !== advertiser?.id) {
      const advertiserObj: Advertiser | undefined =
        user.advertiser_accounts.find((a) => a.id === newAdevertiserId);

      setAdvertiser(advertiserObj || defaultAdvertiser);
      setUser(user);
    }
  };

  useEffect(() => {
    if (user) {
      if (
        searchParams.get("aid") &&
        (!advertiser || advertiser.id !== searchParams.get("aid"))
      ) {
        setAdvertiserContext(searchParams.get("aid")!);
      } else if (advertiser?.id === "-1")
        navigate("/access-denied", { replace: true });
      else if (advertiser && !searchParams.get("aid"))
        setAdvetiserIdSearchParam(advertiser.id);
      else setAdvertiserContext();
    }
  }, [searchParams.get("aid"), advertiser?.id, user]);
};
