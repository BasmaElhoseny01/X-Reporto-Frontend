import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";

function AllPatient() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "Patient Name",
        dataIndex: "patient_name",
        key: "patient_name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.patient_name.toString().toLowerCase().includes(value.toLowerCase());
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
        dataIndex: "birth_date",
        key: "birth_date",
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

    api: "/api/v1/patients/?",
    title: "All Patients",
    filterColumns : ["email","phone_number","studies"],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      window.location.pathname = `patients/${record.id}`;
    },
    addNew: () => {
      window.location.pathname = "patients/new";
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

export default AllPatient;
