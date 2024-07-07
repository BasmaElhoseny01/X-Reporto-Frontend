/* eslint-disable */
import React from "react";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../state";

// Components
import GeneralTable from "../../common/Table/Table";

// Styled Components
import { HistoryContainer } from "./ViewHistory.style";

interface ViewHistoryProps {
  api: string;
}

function ViewHistory(props: ViewHistoryProps) {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "X-Ray",
        dataIndex: "study_name",
        key: "study_name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.study_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        // eslint-disable-next-line
        // sorter: (a: any, b: any) => a.status - b.status,
      },
      {
        title: "Last View At",
        key: "last_view_at",
        dataIndex: "last_view_at",
      },
      {
        title: "Last Edited At",
        dataIndex: "last_edited_at",
        key: "last_edited_at",
        // eslint-disable-next-line
        // sorter: (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        // eslint-disable-next-line
        // sorter: (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
      },
      {
        title: "Updated At",
        dataIndex: "updated_at",
        key: "updated_at",
      },
    ],

    api: props.api,
    title: "History",
    filterColumns: [
      "notes",
      "xray_path",
      "xray_type",
      "patient_id",
      "doctor_id",
      "employee_id",
      "id",
    ],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      window.location.pathname = `patients/${record.id}`;
    },
    addNew: () => {
      window.location.pathname = "reports/new";
    },
  };

  return (
    <HistoryContainer>
      <GeneralTable
        key={GeneralTableData.title}
        columns={GeneralTableData.columns}
        api={GeneralTableData.api}
        title={GeneralTableData.title}
        action={GeneralTableData.action}
        addNew={GeneralTableData.addNew}
        filterColumns={GeneralTableData.filterColumns}
      />
    </HistoryContainer>
  );
}

export default ViewHistory;
