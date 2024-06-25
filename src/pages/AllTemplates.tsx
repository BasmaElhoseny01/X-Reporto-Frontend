import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";


function AllTemplates() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "Template title",
        dataIndex: "template_name",
        key: "template_name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.userId.toString().toLowerCase().includes(value.toLowerCase());
        },
        
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        key: "doctor_id",
        title: "Doctor Id",
        dataIndex: "doctor_id",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.userId.toString().toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        title: "Last Edit",
        dataIndex: "last_edited_at",
        key: "last_edited_at",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
    ],

    api: "api/v1/templates",
    title: "All Templates",
    filterColumns : { "Template title": "Template title","ID":"ID"},
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      window.location.pathname = `templates/${record.id}`;
    },
    addNew: () => {
      window.location.pathname = "templates/new";
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

export default AllTemplates;
