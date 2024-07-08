import React from "react";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../state";

// Components
import GeneralTable from "../components/common/Table/Table";

// Utils
import { reDirectToEmployees } from "./paths.utils";

function AllEmployees() {
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "Name",
        dataIndex: "employee_name",
        key: "employee_name",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.employee_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "UserName",
        dataIndex: "username",
        key: "username",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.username
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        // eslint-disable-next-line
        onFilter: (value: any, record: any) => {
          return record.role
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
        sorter: (a: any, b: any) => a.role.localeCompare(b.role),
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
      {
        title: "Create At",
        dataIndex: "created_at",
        key: "created_at",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        },
      },
    ],

    api: "/api/v1/employees/?type=employee&",
    title: "Employees",
    filterColumns: ["type", "phone_number", "email", "employee_id"],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      reDirectToEmployees("view", record.id);
    },
    addNew: () => {
      reDirectToEmployees("new");
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

export default AllEmployees;
