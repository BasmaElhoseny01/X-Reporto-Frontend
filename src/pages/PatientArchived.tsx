import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";

function PatientArchived() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "Patient Name",
        dataIndex: "name",
        key: "name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.userId.toString().toLowerCase().includes(value.toLowerCase());
        },
        
      },
      {
        title: "User ID",
        dataIndex: "id",
        key: "id",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        key: "gender",
        title: "Gender",
        dataIndex: "gender",
      },
      {
        title: "Date of Birth",
        dataIndex: "dob",
        key: "dob",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
    ],

    api: "",
    title: "Archived Patients",
    filterColumns : { "Patient Name": "Patient Name"},
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      window.location.pathname = `patients/${record.id}`;
    },
    addNew: () => {
      window.location.pathname = "patients/new-archived";
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

export default PatientArchived;
