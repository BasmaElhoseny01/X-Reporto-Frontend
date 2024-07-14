import React from "react";

// Hooks
import useCustomNavigate from "../hooks/useCustomNavigate";

// Services
import axios from "../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../state";

// Ant Design
import { Button, message } from "antd";

// Components
import GeneralTable from "../components/common/Table/Table";

function UnAssigned() {
  // Navigate
  const { navigateToCases } = useCustomNavigate();

  const tableSearch = useSelector((state: MainState) => state.tableSearch);

  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

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
        key: "Created At",
        title: "created_at",
        dataIndex: "created_at",
        // eslint-disable-next-line
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        },
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
      {
        title: "Action",
        dataIndex: "unassigned",
        key: "last_edited_at",
        render: (text: any, record: any) => {
          return (
            <Button
              type="link"
              style={{ padding: "0px", textDecoration: "underline" }}
              disabled={user?.type !== "doctor"}
              onClick={() => {
                console.log(record);
                // prevent action when user click on the row
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${token}`;
                axios
                  .post(`/api/v1/studies/${record.id}/assign`)
                  .then((response) => {
                    if (response.status === 200) {
                      message.success("Case assigned successfully!");
                      navigateToCases("view", record.id);
                      // setTimeout(() => {
                      //   // Redirect to the View Page for the case
                      // reDirectToCases("view", record.id);
                      // }, 500);
                    } else {
                      message.error("Error, failed to assign!");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Assign
            </Button>
          );
        },
      },
    ],

    api: "/api/v1/studies/?status=new&",
    title: "Unassigned Cases",
    filterColumns: [
      "status",
      "notes",
      "last_view_at",
      "updated_at",
      "employee_id",
    ],
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      navigateToCases("view", record.id);
    },
    addNew: () => {
      navigateToCases("new");
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
      addNewButton={user?.type === "doctor"}
    />
  );
}

export default UnAssigned;
