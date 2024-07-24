import React, { useEffect, useState } from "react";
import {
  CardContainer,
  CardDate,
  CardSecondSubContainer,
  CardSubContainer,
  ImageDetails,
  SubTitle,
} from "./InfoSection.Styles";
import LinkButton from "../../../../common/LinkButton/LinkButton";
import { Image } from "antd";
import { FolderOpenFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";
import axios from "../../../../../services/apiService";

type CardProps = {
  id: number;
  created_at: string;
  xray_path: string;
  status: string;
};
function Card(props: CardProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const token = useSelector((state: MainState) => state.token);

  useEffect(() => {
    const fetchImageUrl = async () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL_DEV}/api/v1/results/download_file?file_path=${props.xray_path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            const blob = response.data.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
          } else {
            console.error("Failed to fetch image");
          }
        })
        .catch((error) => {
          console.error("Error fetching image: ", error);
        });
    };
    fetchImageUrl();
  }, [props.xray_path]);

  return (
    <CardContainer>
      <CardSubContainer>
        <Image width={40} src={imageUrl} />
        <ImageDetails>
          <LinkButton
            onClick={() => (window.location.pathname = `/reports/${props.id}`)}
          >
            {props.id}
          </LinkButton>
          <CardDate>Created at : {props.created_at}</CardDate>
        </ImageDetails>
      </CardSubContainer>
      <CardSecondSubContainer>
        <SubTitle>{props.status}</SubTitle>
        <FolderOpenFilled style={{ fontSize: 20 }} />
      </CardSecondSubContainer>
    </CardContainer>
  );
}

export default Card;
