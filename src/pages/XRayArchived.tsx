import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";

function XRayArchived() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "Name",
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
        title: "X-Ray ID",
        dataIndex: "id",
        key: "id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.id
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Patient ID",
        dataIndex: "patient_id",
        key: "patient_id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.patient_id
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Doctor ID",
        dataIndex: "doctor_id",
        key: "doctor_id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.doctor_id
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
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Last Edited At",
        dataIndex: "last_edited_at",
        key: "last_edited_at",
      },
    ],

    api: "/api/v1/studies/?status=archived&",
    title: "WorkList",
    filterColumns: ["status","notes","last_view_at","updated_at","employee_id"],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      window.location.pathname = `reports/${record.id}`;
    },
    addNew: () => {
      window.location.pathname = "reports/new";
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

export default XRayArchived;
