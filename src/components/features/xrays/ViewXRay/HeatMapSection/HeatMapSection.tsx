/* eslint-disable */
import React, { useEffect, useState } from "react";

import { HeatMapSectionContainer } from "./HeatMapSection.Styles";
import { LineHeader, Title } from "./HeatMapSection.Styles";

import InputRow from "./InputRow";
import { ResultType } from "../../../../../types/Result";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { Flex, message, Spin, Typography } from "antd";
import axios from '../../../../../services/apiService';
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";

// Interface for HeatMapSection
interface HeatMapSectionProps {
  // Props Here
  useAI: boolean;
  toggleUseAI: () => void;
  botImgBlue: string;
  botImgGrey: string;

  templateResultData: ResultType;
  customResultData: ResultType;
  caseId: number | null;
}


function HeatMapSection(props: HeatMapSectionProps) {
  const token  = useSelector((state: MainState) => state.token);
  const {
    useAI,
    toggleUseAI,
    botImgBlue,
    botImgGrey,
    templateResultData,
    customResultData,
    caseId,
  } = props;

  const [atelectasis,setAtelectasis] = useState<string | null>("");
  const [cardiomegaly,setCardiomegaly] = useState<string | null>("");
  const [edema,setEdema] = useState<string | null>("");
  const [lungOpacity,setLungOpacity] = useState<string | null>("");
  const [noFinding,setNoFinding] = useState<string | null>("");
  const [pleuralEffusion,setPleuralEffusion] = useState<string | null>("");
  const [pneumonia,setPneumonia] = useState<string | null>("");
  const [supportDevices,setSupportDevices] = useState<string | null>("");
  const [probabilities,setProbabilities] = useState<number[] | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [report,setReport]=useState<string>("");
  const [data,setdata]=useState(templateResultData);
  const [resId,setResId]=useState(templateResultData?.id);

  const checkResultStatus = async (
    result_id: number,
    token: string
  ): Promise<ResultType | null> => {
    console.log("Checking report status... result_id", result_id);
    try {
      const response = await axios.get(`/api/v1/results/${result_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.report_path) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.log("Error checking report status: ", error);
      return null;
    }
  };
  
  const pollResultStatus = async (
    result_id: number,
    token: string,
    setdata: (data: ResultType) => void,
    setUseAI: (data: boolean) => void
  ) => {
    const interval = 5000; // Poll every 5 seconds
    const maxAttempts = 20; // Maximum number of attempts before giving up
    let attempts = 0;
  
    const hide = message.loading("Generating report...", 0); // Display loading message with spinner
  
    const poll = async () => {
      if (attempts < maxAttempts) {
        try {
          const result = await checkResultStatus(result_id, token);
          console.log("Report status:", result);
          if (result) {
            hide(); // Close loading message
            message.success("Report is ready!");
            setdata(result);
            setProbabilities(result.confidence)
            getHeatmapImages(result.id);
            getReport(result.report_path);
            setFetching(false)
            // Handle the ready report (e.g., download it, display it, etc.)
            console.log("Report is ready:", result);
            return;
          } else {
            attempts++;
            setTimeout(poll, interval);
          }
        } catch (error) {
          console.error("Error checking report status:", error);
          hide(); // Close loading message
          message.error("Failed to check report status");
        }
      } else {
        hide(); // Close loading message
        message.error("Report generation timed out");
        window.location.reload();
      }
    };
  
    poll();
  };
  const getHeatmapImages = async (id:number) => {
    axios.get(`api/v1/results/${id}/get_heatmap/0`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
    ).then((response) => {
      setAtelectasis(URL.createObjectURL(response.data));
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    });
    axios.get(`api/v1/results/${id}/get_heatmap/1`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setCardiomegaly(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/2`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setEdema(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/3`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setLungOpacity(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/4`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setNoFinding(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/5`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setPleuralEffusion(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/6`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setPneumonia(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/7`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }).then((response) => {
      setSupportDevices(URL.createObjectURL(response.data).toString());
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
  }

  const getReport=async (path:string)=>{
    axios.get(`/api/v1/results/download_file?file_path=${path}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log("Report Response: ", response);
      setReport(response.data);
    }).catch((error) => {
      console.log("Error getting report: ", error);
    }
    );
  }
  useEffect(() => {
    console.log("props :",props)
    if (data === null) {
      if (props.caseId !== null) {
        // run heatmap
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`api/v1/studies/${props.caseId}/run_heatmap`).then((response) => {
          setResId(response.data.id);
        }).catch((error) => {
          console.log("Error running heatmap: ", error);
        }).finally(() => {
          if (resId !== undefined && resId !== null){
            pollResultStatus(resId, token, setdata, toggleUseAI);
            }
        });
      }
    }else{
      setProbabilities(data.confidence)
      getHeatmapImages(data.id);
      getReport(data.report_path);
      setFetching(false);
    }
  }, [resId,props.caseId]);

  return (
    fetching ? 
      <>
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          // width: "100%",
          flex: "1",
        }}
      >
        <Spin tip="Loading" size="large">
          <div
            style={{
              padding: 200,
              // background: "rgba(0, 0, 0, 0.05)",
              borderRadius: 4,
            }} />
        </Spin>
      </div> 
     </> :
      <HeatMapSectionContainer>
          <Title justify="flex-start">Findings</Title>
          <LineHeader />
          <InputRow
            Atelectasis={atelectasis}
            Cardiomegaly={cardiomegaly}
            Edema={edema}
            LungOpacity={lungOpacity}
            NoFinding={noFinding}
            PleuralEffusion={pleuralEffusion}
            Pneumonia={pneumonia}
            SupportDevices={supportDevices}
            probabilities={probabilities} />
          <LineHeader />
          <Title justify="flex-start">Report</Title>
          <Typography style={{marginTop: 20, marginBottom: 20}}>{report}</Typography>
      </HeatMapSectionContainer>
  );
}

export default HeatMapSection;
