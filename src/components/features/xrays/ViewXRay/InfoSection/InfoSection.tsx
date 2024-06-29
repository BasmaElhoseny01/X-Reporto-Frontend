import React, { useEffect, useState } from "react";
import {
  ActionsContainer,
  InfoSectionContainer,
  LineHeader,
  Title,
} from "./InfoSection.Styles";
import InputRow from "./InputRow";
import PatientData from "./PatientData";
import PatientHistory from "./PatientHistory";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";
import { useView } from "../ViewProvider";
import axios from "../../../../../services/apiService";
import { MainState } from "../../../../../state";
import { useSelector } from "react-redux";

type responseDataType = {
  id: number;
  study_name: string,
  status: string,
  notes: string,
  last_view_at: string,
  last_edited_at: string,
  updated_at: string,
  created_at: string,
  xray_path: string,
  xray_type: string,
  severity: 0,
  is_archived: boolean,
  patient_id: 0,
  doctor_id: 0,
  employee_id: 0,
  patient: {
    patient_name: string;
    age: number;
    birth_date: string;
    gender: string;
    id: number;
    studies: []
  };
};
function InfoSection() {
  // Context
  const { handleSetSiderType } = useView();
  const [data, setData] = useState<responseDataType>();
  const token = useSelector((state: MainState) => state.token);
  const id = window.location.pathname.split("/").pop();

  useEffect(() => { 
    axios.defaults.headers.common["Authorization"] =`Bearer ${token}`; 
    axios
      .get(`/api/v1/studies/${id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <InfoSectionContainer>
      <Title justify="flex-start">Findings</Title>
      <LineHeader />
      <InputRow />
      <Title justify="flex-start" style={{ marginTop: 5 }}>
        {" "}
        Info{" "}
      </Title>
      <LineHeader />
      
      {
        data !== undefined && (
          <PatientData 
            name={data.patient.patient_name} 
            age={data.patient.age} 
            dateOfBirth={data.patient.birth_date} 
            gender={data.patient.gender}
            id={data.patient.id}
          />
        )
      }
      <Title justify="flex-start" style={{ marginTop: 5 }}>
        {" "}
        History{" "}
      </Title>
      <LineHeader />
      {
        data !== undefined && (
          <PatientHistory id={data.patient.id} />
        )
      }
      <ActionsContainer>
        <SecondaryButton style={{ margin: "10px 10px 0", padding: 5 }}>
          {" "}
          Save as draft{" "}
        </SecondaryButton>
        <PrimaryButton
          style={{ margin: "10px 10px 0", padding: 5 }}
          onClick={() => handleSetSiderType("report")}
        >
          {" "}
          View Report{" "}
        </PrimaryButton>
      </ActionsContainer>
    </InfoSectionContainer>
  );
}

export default InfoSection;
