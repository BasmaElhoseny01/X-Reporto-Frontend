import React from "react";

// Components
import PrimaryButton from "../components/common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton/SecondaryButton";

// Ant Design
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import GeneralTable from "../components/common/Table/Table";

function Home() {
 
  // for testing
  const GeneralTableData={
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
    action: (record:any, rowIndex:any) => {
      console.log(record, rowIndex);
    },
  };
  return (
    <div>
      <div
        style={{
          // height: "500px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "2rem",
        }}
      >
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
      </div>
      <GeneralTable columns={GeneralTableData.columns} api={GeneralTableData.api} action={GeneralTableData.action}/>
    </div>
  );
}

export default Home;
