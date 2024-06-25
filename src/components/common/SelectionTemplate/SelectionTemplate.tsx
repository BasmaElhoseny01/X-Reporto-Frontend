import React, { useState, useEffect } from "react";
import axios from "axios";
import { SelectionButton } from "./SelectionTemplate.style";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  selectedValue: string;
  handleSelectionChange: (value: string, label: string) => void;
}

export const defaultTemplate = `
  <table style="width:100%; text-align: left;">
    <tbody>
      <tr>
        <th style="width:25%;">Name</th>
        <th style="width:25%;"></th>
        <th style="width:25%;">ID</th>
        <th style="width:25%;"></th>
      </tr>
      <tr>
        <th>Gender</th>
        <th></th>
        <th>Age</th>
        <th></th>
      </tr>
      <tr>
        <th>Captured</th>
        <th></th>
        <th>Submitted</th>
        <th></th>
      </tr>
    </tbody>
  </table>
  <hr>
  <h3 style="text-align: center;">Final Report</h3>
  <div>
    <h4>Examination:</h4>
        <p></p><br>
    <h4>Indaction:</h4>
        <p></p><br>
    <h4>Technique:</h4>
        <p></p><br>
    <h4>Comparison:</h4>
    <p></p><br>
    <h4>Findings:</h4>
    <p id="findings"></p><br>
    <h4>Impression:</h4>
  </div>
  <hr />
  <table style="width:100%; text-align: left; border-style: hidden;">
    <tbody>
      <tr style="border-style: hidden;">
        <th style="border-style: hidden;">Submitted by</th>
      </tr>
      <tr style="border-style: hidden;">
        <th style="border-style: hidden;">Dr.NeillRousseau</th>
        <th style="border-style: hidden; text-align: center;">Page 1 of 1</th>
        <th style="border-style: hidden; text-align: center;">at 25-05-2025 05:00 PM</th>
      </tr>
    </tbody>
  </table>
`;

function SelectionTemplate({ selectedValue, handleSelectionChange }: Props) {
  const [options, setOptions] = useState<Option[]>([
    { value: defaultTemplate, label: "Default" },
    { value: "", label: "Empty" },
  ]);

  useEffect(() => {
    axios
      .get("/api/options")
      .then((response) => {
        const fetchedOptions: Option[] = response.data.map((option: Option) => ({
          value: option.value,
          label: option.label,
          disabled: option.disabled || false,
        }));
        setOptions(fetchedOptions);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const handleChange = (value: string, option: Option): void => {
    handleSelectionChange(value, option.label);
  };

  return (
    <SelectionButton
      size="large"
      defaultValue={defaultTemplate}
      value={selectedValue}
      onChange={(value, option) => handleChange(value as string, option as Option)}
      options={options}
    />
  );
}

export default SelectionTemplate;
