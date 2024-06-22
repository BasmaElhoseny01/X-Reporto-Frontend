import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";

function XRayWorkList() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "X-Ray ID",
        dataIndex: "xid",
        key: "xid",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.userId
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Patient ID",
        dataIndex: "pid",
        key: "pid",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.userId
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Patient Name",
        dataIndex: "name",
        key: "name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.userId
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        key: "Created At",
        title: "created_at",
        dataIndex: "created_at",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Assigned To",
        dataIndex: "assigned_to",
        key: "assigned_to",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.userId
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Last Reviewed By",
        dataIndex: "last_reviewed_by",
        key: "last_reviewed_by",
      },
    ],

    api: "",
    title: "WorkList",
    filterColumns: {
      "Patient Name": "Patient Name",
      "Assigned To": "Assigned To",
      "Patient ID": "Patient ID",
      "X-Ray ID": "X-Ray ID",
    },
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      console.log(record, rowIndex);
    },
    addNew: () => {
      window.location.pathname = "/new";
    },
  };

  return (
    <GeneralTable
      columns={GeneralTableData.columns}
      api={GeneralTableData.api}
      title={GeneralTableData.title}
      action={GeneralTableData.action}
      addNew={GeneralTableData.addNew}
      filterColumns={GeneralTableData.filterColumns}
    />
  );
}

export default XRayWorkList;
