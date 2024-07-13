import React from "react";

// Antd
// import { Button, message } from "antd";


// Redux
import { useSelector } from "react-redux";
import { MainState } from "../state";

// Components
import GeneralTable from "../components/common/Table/Table";
import useCustomNavigate from "../hooks/useCustomNavigate";

function DoctorCompletedCases() {
  const customNavigate = useCustomNavigate();
  // const token = useSelector((state: MainState) => state.token);
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
        title: "Case ID",
        dataIndex: "id",
        key: "id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Patient ID",
        dataIndex: "patient_id",
        key: "patient_id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.patient_id - b.patient_id,
      },
      {
        title: "Doctor ID",
        dataIndex: "doctor_id",
        key: "doctor_id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.doctor_id - b.doctor_id,
      },
      {
        key: "Created At",
        title: "created_at",
        dataIndex: "created_at",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.created_at - b.created_at,
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.severity - b.severity,
      },
      {
        title: "Last Edited At",
        dataIndex: "last_edited_at",
        key: "last_edited_at",
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.last_edited_at);
          const dateB = new Date(b.last_edited_at);
          return dateA.getTime() - dateB.getTime();
        },
      },
    ],

    api: "/api/v1/studies/assigned?status=completed&",
    title: "My Completed Cases",
    filterColumns: [
      "status",
      "notes",
      "last_view_at",
      "updated_at",
      "employee_id",
    ],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      // reDirectToCases("view", record.id);
      customNavigate.navigateToCases("view", record.id);
    },
    addNew: () => {
      window.location.pathname = "reports/new";
    },
  };

  return (
    <GeneralTable
      key={GeneralTableData.title}
      columns={GeneralTableData.columns}
      api={GeneralTableData.api}
      title={GeneralTableData.title}
      action={GeneralTableData.action}
      addNew={GeneralTableData.addNew}
      filterColumns={GeneralTableData.filterColumns}
    />
  );
}

export default DoctorCompletedCases;
