import React, { useState } from "react";

// Components
import PrimaryButton from "../components/common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton/SecondaryButton";
import GeneralTable from "../components/common/Table/Table";

// Ant Design
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Popconfirm, PopconfirmProps, Tooltip, message } from "antd";
import LinkButton from "../components/common/LinkButton/LinkButton";
import { useSelector } from "react-redux";
import { MainState } from "../state";

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
  // Editable Text
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("text");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you might want to save the edited text using a callback or other method
  };

  //----------------------------------------------------------------------------------------------------
  // General Table Data
  const tableSearch = useSelector((state: MainState) => state.tableSearch);
  const GeneralTableData = {
    columns: [
      {
        title: "ID",
        dataIndex: "id",
        key: "name",
        // eslint-disable-next-line
        sorter : (a: any, b: any) => a.id - b.id,
      },
      {
        title: "User ID",
        dataIndex: "userId",
        key: "2",
        filteredValue: [tableSearch],
        // eslint-disable-next-line
        onFilter: (value: any, record: any) =>{
          return  record.userId.toString().toLowerCase().includes(value.toLowerCase());
        },
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

    title: "General Table",
    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      console.log(record, rowIndex);
    },
    addNew: () => {
      console.log("Add New");
    },
    filterColumns:[]
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
          padding: "1rem",
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

        <LinkButton>View</LinkButton>

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
      {/* Tools */}
      <Tooltip title="Click to edit">
        {isEditing ? (
          <Input
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            onBlur={handleSave}
            onPressEnter={handleSave}
            autoFocus
          />
        ) : (
          <span onClick={handleEdit}>{editableText}</span>
        )}
      </Tooltip>

      {/* ********************************************************* */}
      {/* General Table */}
      <GeneralTable
        columns={GeneralTableData.columns}
        api={GeneralTableData.api}
        action={GeneralTableData.action}
        addNew={GeneralTableData.addNew}
        title={GeneralTableData.title}
        filterColumns = {GeneralTableData.filterColumns}
      />
    </div>
  );
}

export default Examples;
