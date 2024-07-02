import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MainState } from "../state";
import GeneralTable from "../components/common/Table/Table";
import axios from '../services/apiService';
import { Button } from "antd";

function UnAssigend() {
  const token = useSelector((state: MainState) => state.token);
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const [me, setMe] = React.useState({} as any);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("/api/v1/employees/me")
      .then((response) => {
        setMe(response.data);
        console.log(me);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

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
      {
        title: "Action",
        dataIndex: "unassigned",
        key: "last_edited_at",
        render: (text: any, record: any) => {
          return (
            <Button
              type="link"
              style={{ padding: "0px",textDecoration: "underline"}}
              disabled={me.type !== "doctor"}
              onClick={() => {
                console.log(record);
                // prevent action when user click on the row              
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                axios
                  .post(`/api/v1/studies/${record.id}/assign`)
                  .then((response) => {
                    if(response.status === 200) {
                      window.location.reload();
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
    title: "Unassigned X-Rays",
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

export default UnAssigend;
