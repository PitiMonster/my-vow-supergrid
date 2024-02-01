import { Listbox } from "@headlessui/react";
import { getNearIndexRoute } from "App/AppRouter/utils";
import { Fragment, useContext, useRef } from "react";
import { usePopper } from "react-popper";
import { useLocation, useNavigate } from "react-router-dom";

import { Advertiser } from "common/types";
import { UserContext } from "common/utils";

export const AdvertiserDropdown = () => {
  const { user, advertiser } = useContext(UserContext);

  // use standard useNavigate here instead of useNavigateWithAdvertiser to not overwrite new advertiser with current advertiser (merging search params works so)
  const navigate = useNavigate();
  const location = useLocation();

  const referenceRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const { styles, attributes } = usePopper(
    referenceRef.current,
    listRef.current,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 0],
          },
        },
        {
          name: "preventOverflow",
          options: {
            altAxis: true,
            boundary: document.querySelector("#root") || document.body,
            padding: 15,
          },
        },
      ],
    }
  );

  /**
   * Select callback for dropdown, that updates the advertiser id in search params.
   * @param advertiser selected Advertiser option
   */
  const handleSelect = (adv: Advertiser) => {
    if (!user) return;

    const newAdvertiser =
      user.advertiser_accounts.find((el) => el.id === adv.id) ||
      user.advertiser_accounts[0];
    // When advertiser ID changes
    if (newAdvertiser.id !== advertiser?.id) {
      // Advertiser must be on the list as it is selection from dropdown only
      const advertiserObj: Advertiser = user.advertiser_accounts.find(
        (a) => a.id === newAdvertiser.id
      ) as Advertiser;

      const nearIndexRoute = getNearIndexRoute(location.pathname);
      if (nearIndexRoute)
        navigate(
          { pathname: nearIndexRoute, search: `?aid=${advertiserObj.id}` },
          {
            replace: true,
          }
        );
      else
        navigate(
          { pathname: location.pathname, search: `?aid=${advertiserObj.id}` },
          {
            replace: true,
          }
        );
    }
  };

  if (!advertiser) return <div />;

  return (
    <Listbox value={advertiser} onChange={handleSelect}>
      <Listbox.Button
        ref={referenceRef}
        className="w-[250px] h-[40px] rounded-[4px] border border-gray-300 transition bg-white hover:bg-gray-100 text-blue-800 px-3 py-2"
      >
        {advertiser.name}
      </Listbox.Button>
      <Listbox.Options
        ref={listRef}
        className="z-10 flex flex-col gap-y-1 bg-white border border-bg-gray-200 shadow-md"
        style={styles.popper}
        {...attributes.popper}
      >
        {user?.advertiser_accounts.map((adv) => (
          <Listbox.Option key={adv.id} value={adv} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`transition text-blue-800 p-1 rounded-[4px] ${
                  selected
                    ? "bg-blue-300 text-white"
                    : active
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {adv.name}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
