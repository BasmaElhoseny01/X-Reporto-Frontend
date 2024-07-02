import React, { useEffect, useState } from "react";
import { HostoryContainer } from "./InfoSection.Styles";
import Card from "./Card";
import { FileSearchOutlined } from "@ant-design/icons";
import { NotFoundContainer, SubTitle } from "./InfoSection.Styles";
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";
import axios from "../../../../../services/apiService";

type responseDataType = {
  study_name: string,
  status: string,
  notes: string,
  last_view_at: string,
  last_edited_at: string,
  updated_at: string,
  created_at: string,
  xray_path: string,
  xray_type: string,
  severity: number,
  patient_id: number,
  doctor_id: number,
  employee_id: number,
  id: number
};
type PatientHistoryProps = {
  id: number;
};
function PatientHistory(props: PatientHistoryProps) {
  const [data, setData] = useState<responseDataType[]>([]);
  const token = useSelector((state: MainState) => state.token);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`/api/v1/patients/${props.id}/studies`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    data.length >0 ? (
      <HostoryContainer>
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            created_at={item.created_at}
            xray_path={item.xray_path}
            status={item.status}
          />
        ))}
      </HostoryContainer>
    ) :
      <NotFoundContainer>
      <FileSearchOutlined style={{fontSize:70}}/>
      <SubTitle>No History Found</SubTitle>
    </NotFoundContainer>
  );
}

export default PatientHistory;
