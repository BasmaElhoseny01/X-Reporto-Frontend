import React, { useState, ChangeEvent } from 'react';
import { ButtonContainer, SearchContainer, SearchInputContainer } from "./SearchInput.Style";
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";
import { PlusOutlined ,ContainerOutlined} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

interface SearchInputProps {
  onSearch: (value: string) => void;
}

function SearchInput ({ onSearch }: SearchInputProps) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if(e.target.value === ''){
      onSearch('');
    }
  };
  const handleSearch = (value: string) => {
    onSearch(value);
  };
  const handleAddPatient = () => {
    // Perform any necessary actions before navigating
    // Example: Saving data, validation, etc.

    // Navigate to the desired route using history.push
    navigate('/patient/new'); // Replace with your actual route
  };
  return (
    <SearchContainer>
      <SearchInputContainer
        placeholder="input search text"
        allowClear
        size='large'
        style={{ width: "25%" }}
        value={inputValue}
        onChange={handleChange}
      onSearch={handleSearch}
      />
      <ButtonContainer>
        <PrimaryButton icon={<PlusOutlined />} onClick={handleAddPatient}>Add Patient</PrimaryButton>
        <PrimaryButton danger icon={<ContainerOutlined />}>Archive Patient</PrimaryButton>
      </ButtonContainer>
    </SearchContainer>
  );
}

export default SearchInput;