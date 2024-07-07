import React, { useState, useEffect } from "react";
import axios from "axios";
import { SelectionButton } from "./SelectionTemplate.style";
import { baseUrl, token } from "../../../types/api";

interface Template {
  template_name: string;
  template_path: string;
  id: number;
}

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  selectedValue: string;
  handleSelectionChange: (value: string, labelValue: string, label: string) => void;
}

export const defaultTemplate = 
`
  <table style="width:100%; text-align: left;margin:0;">
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
  <h3 style="text-align: center; margin:0;">Final Report</h3>
  <div>
    <h4>Examination:</h4>
    <h4>Comparison:</h4>
    <h4 style="margin:0;">Findings:</h4>
    <p id="findings"></p>
    <h4>Impression:</h4>
  </div>
  <hr />
  <table style="width:100%; text-align: left; border-style: hidden;margin:0;">
    <tbody>
      <tr style="border-style: hidden;">
        <th style="border-style: hidden;">Submitted by</th>
      </tr>
      <tr style="border-style: hidden;">
        <th style="border-style: hidden; text-align: center;">Page 1 of 1</th>
        <th style="border-style: hidden; text-align: center;"></th>
      </tr>
    </tbody>
  </table>
`;
const emptyTemplate = "<h4>Findings:</h4>";
function SelectionTemplate({ selectedValue, handleSelectionChange }: Props) {
  const [options, setOptions] = useState<Option[]>([
    { value: "-1", label: "Default" },
    { value: "-2", label: "Empty" },
  ]);

  useEffect(() => {
    axios
      .get(`${baseUrl}templates/`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
        }
      })
      .then((response) => {
        const fetchedOptions: Option[] = response.data.map((template: Template) => {
          if (template.template_path != null && template.template_path != "") {
            return {
              value: template.id.toString(), // Use template ID as the value
              label: template.template_name,
              disabled: false,
            };
          }
          return null;
        }).filter(Boolean) as Option[];

        // Ensure no duplicate values
        setOptions((prevOptions) => {
          const existingValues = new Set(prevOptions.map(opt => opt.value));
          const newOptions = fetchedOptions.filter(opt => !existingValues.has(opt.value));
          return [...prevOptions, ...newOptions];
        });
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
      });
  }, []);

  const handleChange = (value: string, option: Option): void => {
    if (value && value !== "" && option.label !== "Empty" && option.label !== "Default") {
      axios
        .get(`${baseUrl}templates/${value}/download_template`, {
          headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
          }
        })
        .then((response) => {
          handleSelectionChange(response.data, value, option.label);
        })
        .catch((error) => {
          console.error(`Error downloading template ${option.label}:`, error);
        });
    } else {
      if (value === "-1") handleSelectionChange(defaultTemplate, "-1", option.label); // Use default template if value is -1
      else if (value === "-2") handleSelectionChange(emptyTemplate, "-2",""); // Use empty template if value is -2
      else handleSelectionChange(defaultTemplate, "", option.label); // Use default template if value is empty
    }
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
