import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";

function ReportCompleted() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "X-Ray ID",
        dataIndex: "xid",
        key: "xid",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.userId.toString().toLowerCase().includes(value.toLowerCase());
        },
        
      },
      {
        title: "Patient ID",
        dataIndex: "pid",
        key: "pid",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.userId.toString().toLowerCase().includes(value.toLowerCase());
        },
        
      },
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
        key: "created_at",
        title: "Created At",
        dataIndex: "created_at",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        key: "submitted_at",
        title: "Submitted At",
        dataIndex: "submitted_at",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        key: "submitted_by",
        title: "Submitted By",
        dataIndex: "submitted_by",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
    ],

    api: "",
    title: "Completed Reports",
    filterColumns : { "Patient Name": "Patient Name" , "Assigned To": "Assigned To" , "Patient ID":"Patient ID" , "X-Ray ID":"X-Ray ID"},
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

export default ReportCompleted;
