import React from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";

function AllTemplates() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const user = useSelector((state: MainState) => state.user);

  const GeneralTableData = {
    columns: [
      {
        title: "Template title",
        dataIndex: "template_name",
        key: "template_name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.template_name
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
        key: "doctor_id",
        title: "Doctor Id",
        dataIndex: "doctor_id",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => a.doctor_id - b.doctor_id,
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        },
      },
      {
        title: "Last Edit",
        dataIndex: "last_edited_at",
        key: "last_edited_at",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.last_edited_at);
          const dateB = new Date(b.last_edited_at);
          return dateA.getTime() - dateB.getTime();
        },
      },
    ],
    api: "api/v1/templates/?",
    title: "All Templates",
    filterColumns: ["template_path", "last_view_at", "used_count"],
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
      key={GeneralTableData.title}
      columns={GeneralTableData.columns}
      api={GeneralTableData.api}
      title={GeneralTableData.title}
      action={GeneralTableData.action}
      addNew={GeneralTableData.addNew}
      filterColumns={GeneralTableData.filterColumns}
      addNewButton={user?.type === "employee"}
    />
  );
}

export default AllTemplates;
