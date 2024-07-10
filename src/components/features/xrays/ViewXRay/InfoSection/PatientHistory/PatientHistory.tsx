import React, { useEffect, useState } from "react";
// Services
import axios from "../../../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../../../state";

// Antd Design
import { FileSearchOutlined } from "@ant-design/icons";
import { message } from "antd";

// Styled Components
import { HistoryContainer } from "../InfoSection.Styles";
import { NotFoundContainer, SubTitle } from "../InfoSection.Styles";

// Components
import Card from "../Card";

type responseDataType = {
  study_name: string;
  status: string;
  notes: string;
  last_view_at: string;
  last_edited_at: string;
  updated_at: string;
  created_at: string;
  xray_path: string;
  xray_type: string;
  severity: number;
  patient_id: number;
  doctor_id: number;
  employee_id: number;
  id: number;
};
type PatientHistoryProps = {
  id: number;
};

// Server Fetch
const fetchPatient = async (id: number, token: string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`/api/v1/patients/${id}/studies`); // setData(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching Patient: ", error);
    return null;
  }
};

function PatientHistory(props: PatientHistoryProps) {
  const { id } = props;
  // Use States
  const [data, setData] = useState<responseDataType[]>([]);

  // Redux State
  const token = useSelector((state: MainState) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetchPatient(id, token);
          setData(response);
        } else {
          throw new Error("No Patient ID Provided");
        }
      } catch (error) {
        console.error("Error Fetching Patient: ", error);
        message.error("failed to load patient history");
      }
    };
    fetchData();
  }, []);

  return data.length < 0 ? (
    <HistoryContainer>
      {data.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          created_at={item.created_at}
          xray_path={item.xray_path}
          status={item.status}
        />
      ))}
    </HistoryContainer>
  ) : (
    <NotFoundContainer>
      <FileSearchOutlined style={{ fontSize: 70 }} />
      <SubTitle>No History Found</SubTitle>
    </NotFoundContainer>
  );
}

export default PatientHistory;
