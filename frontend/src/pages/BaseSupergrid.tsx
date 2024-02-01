import {
  ColumnApi,
  GetDataParams,
  GridApi,
  useSuperGridEngine,
  GridReadyEvent,
  AgGridReact,
} from "@aleph/supergrid";
import "@aleph/supergrid/style.css";
import { useState } from "react";

const MY_CONFIG = {
  columns: [
    {
      level: "GROUP",
      columns: [
        {
          field: "id",
          rowGroup: true,
        },
        {
          field: "status",
        },
      ],
    },
    {
      level: "AD_ACCOUNT",
      columns: [
        {
          field: "id",
        },
        {
          field: "status",
        },
      ],
    },
  ],
};

async function getData({
  level,
}: GetDataParams<"GROUP" | "AD_ACCOUNT", { cursor: string }>) {
  let data = {
    items: [] as unknown[],

    cursor: "",
  };

  switch (level) {
    case "GROUP":
      // Call your BE endpoint
      data = {
        items: [
          { id: 1, status: "OK" },
          { id: 2, status: "OK" },
        ],
        cursor: "",
      };

      break;
    case "AD_ACCOUNT":
      // Call your BE endpoint
      data = {
        items: [
          { id: 3, status: "OK" },
          { id: 4, status: "OK" },
        ],
        cursor: "",
      };

      break;

    default:
  }

  return {
    data: data.items,
    metaData: { cursor: data.cursor },
  };
}

export const BaseSupergrid = () => {
  const [columnApi, setColumApi] = useState<ColumnApi | null>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [gridBodyElement, setGridBodyElement] = useState<Element | null>(null);
  const props = useSuperGridEngine({
    getData,
    columnApi,
    config: MY_CONFIG,
    gridApi,
    gridBodyElement,
  });

  const handleGridReady = (e: GridReadyEvent<unknown>) => {
    // Your id might be different, select the div that has .ag-center-cols-viewport class
    setGridBodyElement(document.querySelector(".ag-center-cols-viewport"));
    setColumApi(e.columnApi);
    setGridApi(e.api);
  };

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "1000px", width: "1000px" }}
    >
      <AgGridReact
        rowModelType="serverSide"
        onGridReady={handleGridReady}
        rowBuffer={25}
        cacheBlockSize={100}
        animateRows
        {...props.props}
      />
    </div>
  );
};
