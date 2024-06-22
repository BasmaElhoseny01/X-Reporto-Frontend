import React, { useState, ChangeEvent } from "react";
import GeneralTable from "../../../common/Table/Table";
import {
  ButtonContainer,
  SearchContainer,
  SearchInputContainer,
} from "../../../common/SearchInput/SearchInput.Style";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

interface SearchInputProps {
  onSearch: (value: string) => void;
}

function ViewHistory({ onSearch }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // console.log(inputValue);
  };
  const handleSearch = (value: string) => {
    onSearch(value);
  };
  const handleAddXray = () => {
    navigate("/report/new");
  };
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
    title: "General Table",
    addNew: () => {
      console.log("Add New");
    },

    // eslint-disable-next-line
    action: (record: any, rowIndex: any) => {
      console.log(record, rowIndex);
    },
  };

  return (
    <div>
      <SearchContainer>
        <SearchInputContainer
          placeholder="input search text"
          allowClear
          size="large"
          style={{ width: "25%" }}
          value={inputValue}
          onChange={handleChange}
          onSearch={handleSearch}
        />
        <ButtonContainer>
          <PrimaryButton icon={<PlusOutlined />} onClick={handleAddXray}>
            Add X-ray
          </PrimaryButton>
        </ButtonContainer>
      </SearchContainer>
      <GeneralTable
        columns={GeneralTableData.columns}
        api={GeneralTableData.api}
        action={GeneralTableData.action}
        addNew={GeneralTableData.addNew}
        title={GeneralTableData.title}
        filterColumns={{ "": "" }}
      />
    </div>
  );
}

export default ViewHistory;
