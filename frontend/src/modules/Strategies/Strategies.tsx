import {
  ColumnApi,
  GridApi,
  useSuperGridEngine,
  GridReadyEvent,
  AgGridReact,
  SuperGridAnchors,
  columnEditorPlugin,
} from "@aleph/supergrid";
import { useCallback, useContext, useMemo, useState } from "react";

import { AdvertiserDropdown } from "common/components/AdvertiserDropdown";
import { UserContext } from "common/utils";

import { STRATEGIES_TABLE_CONFIG } from "./const";
import { getStrategiesData } from "./utils";

const anchorProps = {
  pinnedRightWidth: 50,
  minWidth: 36,
  leftBoundary: 36,
  pinLeft: false,
};

export const Strategies = () => {
  const [columnApi, setColumApi] = useState<ColumnApi | null>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [gridBodyElement, setGridBodyElement] = useState<Element | null>(null);
  const { advertiser } = useContext(UserContext);

  const getData = useMemo(() => getStrategiesData(advertiser), [advertiser]);

  const props = useSuperGridEngine({
    getData,
    columnApi,
    config: STRATEGIES_TABLE_CONFIG,
    gridApi,
    gridBodyElement,
    plugins: [columnEditorPlugin],
  });

  const handleGridReady = (e: GridReadyEvent<unknown>) => {
    // Your id might be different, select the div that has .ag-center-cols-viewport class
    setGridBodyElement(document.querySelector(".ag-center-cols-viewport"));
    setColumApi(e.columnApi);
    setGridApi(e.api);
  };

  const gridWidth = document.getElementById("super-grid")?.clientWidth ?? 0;

  return (
    <div id="super-grid" className="ag-theme-balham relative w-screen h-screen">
      <div className="flex space-between items-center mr-2">
        <div
          id="reddit-super-grid-anchors"
          className="relative flex-1 whitespace-nowrap overflow-hidden"
        >
          {columnApi && gridApi && (
            <SuperGridAnchors
              {...anchorProps}
              config={STRATEGIES_TABLE_CONFIG}
              colApi={columnApi}
              gridBodyElement={gridBodyElement}
              gridWidth={gridWidth}
              gridApi={gridApi}
              deepestVisibleLevel={props.deepestVisibleLevel}
            />
          )}
        </div>
        <AdvertiserDropdown />
      </div>
      <AgGridReact
        rowModelType="serverSide"
        onGridReady={handleGridReady}
        rowBuffer={25}
        cacheBlockSize={100}
        animateRows
        enableGroupEdit
        {...props.props}
      />
    </div>
  );
};
