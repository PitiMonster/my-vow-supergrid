import { ICellRendererParams } from "@aleph/supergrid";
import { format } from "date-fns";

import { DEFAULT_DATE_FORMAT } from "common/consts";
import {
  formatCurrencyValue,
  formatNumericValue,
} from "common/utils/formatNumericValue";

import { StoryBookConfigType } from "./types";
import { DatePickerColCellEditor, ToggleButtonCellRenderer } from "./utils";

const HEADER_CLASS =
  "text-blue-300 text-14 font-bold border-b border-b-gray-600";

export const STRATEGIES_TABLE_CONFIG: StoryBookConfigType = {
  globalLevel: {
    anchors: {
      label: "Metrics",
      firstColumnId: "impressions",
    },
    columns: [
      {
        colId: "impressions",
        field: "metrics.impressions",
        headerName: "Impressions",
        cellClass: "border-l-blue-300 border-l-[2px]",
        headerClass: HEADER_CLASS,
        type: "number",
        valueFormatter: (value) => formatNumericValue("number", value.value),
      },
      {
        colId: "clicks",
        field: "metrics.click_throughs",
        headerName: "Clicks",
        headerClass: HEADER_CLASS,
        type: "number",
        valueFormatter: (value) => formatNumericValue("number", value.value),
      },
      {
        colId: "spend",
        field: "metrics.total_cost",
        headerName: "Spend",
        headerClass: HEADER_CLASS,
        type: "number",
        valueFormatter: (value) => formatCurrencyValue(value.value),
      },
      {
        colId: "ecpm",
        field: "metrics.ecpm",
        headerName: "eCPM",
        headerClass: HEADER_CLASS,
        type: "number",
        valueFormatter: (value) => formatCurrencyValue(value.value),
      },
      {
        colId: "cpc",
        field: "metrics.ecpc",
        headerName: "CPC",
        headerClass: HEADER_CLASS,
        type: "number",
        valueFormatter: (value) => formatCurrencyValue(value.value),
      },
      {
        colId: "ctr",
        field: "metrics.ctr",
        headerName: "CTR",
        headerClass: HEADER_CLASS,
        type: "number",
        valueFormatter: (value) =>
          formatNumericValue("percentage", value.value),
      },
      {
        colId: "index",
        columnOrderIndex: -1,
        pinned: "left",
        lockPosition: true,
        width: 50,
        cellRenderer: (params: ICellRendererParams) => (
          <p className="text-center">{params.node.rowIndex}</p>
        ),
      },
    ],
  },
  columns: [
    {
      level: "STRATEGY",
      color: "#c847ff",
      nameColDef: {
        editable: true,
        rowGroup: true,
        columnOrderIndex: 0,
      },
      anchors: {
        firstColumnId: "strategy",
        label: "Strategy",
        secondaryColor: "#f6e0ff",
      },

      columns: [
        {
          field: "goal",
        },
      ],
    },
    {
      color: "#4760ff",
      anchors: {
        label: "Campaign",
        secondaryColor: "#e0e4ff",
      },
      nameColDef: {
        editable: true,
        rowGroup: true,
        columnOrderIndex: 0,
      },
      level: "CAMPAIGN",
      columns: [
        {
          field: "id",
          rowGroup: true,
          colId: "column-id",
        },
        {
          field: "status",
        },

        {
          field: "market",
        },
        {
          field: "goal_and_kpi.kpi",
          editable: true,
          cellEditor: "agRichSelectCellEditor",
          cellEditorParams: {
            values: ["cpvc", "reach", "vcr"],
          },
        },
        {
          field: "flight_dates",
          editable: true,
          valueFormatter: (value) => {
            if (!value.value) return "";
            return `${format(value.value.lower, DEFAULT_DATE_FORMAT)}-${format(
              value.value.upper,
              DEFAULT_DATE_FORMAT
            )}`;
          },
          cellEditorPopup: true,
          cellEditor: DatePickerColCellEditor,
        },
        {
          field: "budget",
        },
      ],
    },
    {
      anchors: {
        label: "Ad group",
        secondaryColor: "#e0ffe7",
        subAnchors: [
          { colId: "data", label: "Data" },
          { colId: "targeting", label: "Targeting" },
        ],
      },
      color: "#00e02d",
      nameColDef: {
        editable: true,
        rowGroup: true,
        columnOrderIndex: 0,
      },
      level: "AD_GROUP",
      columns: [
        {
          field: "id",
          colId: "data",
        },
        {
          field: "delivery_activation_status",
          headerName: "",
          cellRenderer: ToggleButtonCellRenderer,
        },
        {
          field: "status",
        },
        {
          field: "type",
        },
        {
          headerName: "Supply source",
          field: "inventory_source",
          colId: "targeting",
        },
        {
          headerName: "Device & OS",
          field: "device",
        },
        {
          headerName: "Audience set",
          field: "audience_set_name",
        },
      ],
    },
  ],
};
