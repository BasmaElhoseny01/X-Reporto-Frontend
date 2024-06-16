import React from "react";

// Components
import PrimaryButton from "../components/common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton/SecondaryButton";
import GeneralTable from "../components/common/Table/Table";

// Ant Design
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, PopconfirmProps, message } from "antd";

function Examples() {
  const [messageApi, contextHolder] = message.useMessage();

  // Message functions
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  const info = () => {
    messageApi.open({
      type: "info",
      content: "This is an info message",
    });
  };

  const loading = () => {
    messageApi.open({
      type: "loading",
      content: "Action in progress..",
      duration: 0,
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 2500);
  };

  //----------------------------------------------------------------------------------------------------
  // Pop Confirm functions
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  //----------------------------------------------------------------------------------------------------
  // General Table Data
  const GeneralTableData = {
    columns: [
      {
        title: "ID",
        dataIndex: "id",
        key: "name",
      },
      {
        title: "User ID",
        dataIndex: "userId",
        key: "2",
      },
      {
        key: "3",
        title: "Status",
        dataIndex: "completed",
        render: (completed: boolean) => {
          return completed ? "Completed" : "Not Completed";
        },
      },
    ],
    api: "https://jsonplaceholder.typicode.com/todos",

    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      console.log(record, rowIndex);
    },
  };
  return (
    <div>
      {contextHolder}
      <div
        style={{
          // height: "500px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "2rem",
        }}
      >
        {/* *********************************************************** */}
        {/* Buttons */}
        <PrimaryButton>Basma</PrimaryButton>
        <SecondaryButton>Basma</SecondaryButton>

        <PrimaryButton danger icon={<DeleteOutlined />}>
          Basma
        </PrimaryButton>
        <SecondaryButton danger icon={<DeleteOutlined />}>
          Basma
        </SecondaryButton>

        <PrimaryButton disabled>Basma</PrimaryButton>
        <SecondaryButton disabled>Basma</SecondaryButton>

        <PrimaryButton icon={<SearchOutlined />}>Basma</PrimaryButton>
        <SecondaryButton icon={<SearchOutlined />}>Basma</SecondaryButton>

        <PrimaryButton loading>Basma</PrimaryButton>
        <SecondaryButton loading>Basma</SecondaryButton>

        {/* *********************************************************** */}
        {/* Messages */}
        <PrimaryButton onClick={success}>Success</PrimaryButton>
        <PrimaryButton onClick={error}>Error</PrimaryButton>
        <PrimaryButton onClick={warning}>Warn</PrimaryButton>
        <PrimaryButton onClick={info}>Info</PrimaryButton>
        <PrimaryButton onClick={loading}>Loading</PrimaryButton>

        {/* *********************************************************** */}
        {/* Pop Confirm */}
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          // placement="left" //check: https://ant.design/components/popconfirm
        >
          <PrimaryButton danger>Pop Confirm</PrimaryButton>
        </Popconfirm>

        <Popconfirm
          title="Title"
          description="Open Popconfirm with Promise"
          onConfirm={() =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(null);
                message.success("Done Loading");
              }, 3000);
            })
          }
          onOpenChange={() => console.log("open change")}
        >
          <PrimaryButton>Open Popconfirm with Promise</PrimaryButton>
        </Popconfirm>
      </div>

      {/* ********************************************************* */}
      {/* General Table */}
      <GeneralTable
        columns={GeneralTableData.columns}
        api={GeneralTableData.api}
        action={GeneralTableData.action}
      />
    </div>
  );
}

export default Examples;
