/* eslint-disable */
import React, { useEffect, useState } from "react";

import { HeatMapSectionContainer } from "./HeatMapSection.Styles";
import { LineHeader, Title } from "./HeatMapSection.Styles";

import InputRow from "./InputRow";
import { ResultType } from "../../../../../types/Result";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { Flex, Spin } from "antd";
import axios from '../../../../../services/apiService';
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";

// Interface for HeatMapSection
interface HeatMapSectionProps {
  // Props Here
  useAI: boolean;
  toggleUseAI: () => void;
  bot_img_blue: string;
  bot_img_grey: string;

  templateResultData: ResultType;
  customResultData: ResultType;
  case_id: number | null;
}


function HeatMapSection(props: HeatMapSectionProps) {
  console.log("HeatMapSection Props: ", props);
  const token  = useSelector((state: MainState) => state.token);
  const {
    useAI,
    toggleUseAI,
    bot_img_blue,
    bot_img_grey,
    templateResultData,
    customResultData,
    case_id,
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

  const downloadXRayFile = async (file_path: string) => {
    try {
      const response = await axios.get(`api/v1/results/download_file`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          file_path: file_path,
        },
        responseType: "blob", // Change responseType to "blob"
      });
  
      // Create a URL for the image blob and set it to an <img> element
      const imageURL = URL.createObjectURL(response.data).toString();
  
      return imageURL;
    } catch (error) {
      console.log("Error fetching X-Ray: ", error);
      return null;
    }
  };

  const getHeatmapImages = async (id:number) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(`api/v1/results/${id}/get_heatmap/0`).then((response) => {
      console.log("Response: ", response);
      setAtelectasis(response.data);
      // downloadXRayFile(response.data).then((url) => {
      //   setAtelectasis(url);
      // });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/1`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setCardiomegaly(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/2`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setEdema(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/3`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setLungOpacity(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/4`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setNoFinding(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/5`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setPleuralEffusion(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/6`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setPneumonia(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    axios.get(`api/v1/results/${id}/get_heatmap/7`).then((response) => {
      downloadXRayFile(response.data).then((url) => {
        setSupportDevices(url);
      });
    }).catch((error) => {
      console.log("Error getting heatmap: ", error);
    }
    );
    
  }
  useEffect(() => {
    if(templateResultData === null ) {
      // run heatmap
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post(`api/v1/studies/${props.case_id}/run_heatmap`).then((response) => {
        console.log("Heatmap Response: ", response);
      }).catch((error) => {
        console.log("Error running heatmap: ", error);
      });
      setTimeout(() => {
        if(props.case_id !== null) {
          getHeatmapImages(props.case_id);
          axios.get(`api/v1/results/${props.case_id}`).then((response) => {
            setProbabilities(response.data.confidence);
          }).catch((error) => {
            console.log("Error getting heatmap: ", error);
          });
          setFetching(false);
        }
      }, 10000);
    }
    else {
      setProbabilities(templateResultData.confidence);
      if (props.case_id !== null) {
        getHeatmapImages(templateResultData.id);
        setFetching(false)
      }
    }
    // read result data
  }, []);

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
              padding: 50,
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
          {/* <Flex justify="flex-end" style={{flexGrow:1}} align="flex-end">
              <PrimaryButton>Generate</PrimaryButton>
            </Flex> */}
        </HeatMapSectionContainer>
  );
}

export default HeatMapSection;
