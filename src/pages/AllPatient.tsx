import React from "react";

// Hooks
import useCustomNavigate from "../hooks/useCustomNavigate";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../state";

// Components
import GeneralTable from "../components/common/Table/Table";

function AllPatient() {
  // Navigation
  const { navigateToPatients } = useCustomNavigate();

  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "Name",
        dataIndex: "patient_name",
        key: "patient_name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.patient_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.id - b.id,
      },
      {
        key: "gender",
        title: "Gender",
        dataIndex: "gender",
      },
      {
        title: "Date of Birth",
        dataIndex: "birth_date",
        key: "birth_date",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.birth_date);
          const dateB = new Date(b.birth_date);
          return dateA.getTime() - dateB.getTime();
        },
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.age - b.age,
      },
    ],

    api: "/api/v1/patients/?",
    title: "All Patients",
    filterColumns: ["email", "phone_number", "studies"],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      navigateToPatients("view", record.id);
    },
    addNew: () => {
      navigateToPatients("new");
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

export default AllPatient;
