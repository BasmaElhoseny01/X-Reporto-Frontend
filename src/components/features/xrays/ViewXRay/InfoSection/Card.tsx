import React from "react";
import { CardContainer, CardDate, CardSecondSubContainer, CardSubContainer, ImageDetails, SubTitle } from "./InfoSection.Styles";
import LinkButton from "../../../../common/LinkButton/LinkButton";
import { Image } from "antd";
import {FolderOpenFilled} from "@ant-design/icons";

type CardProps = {
  id:number;
  created_at:string;
  xray_path:string;
  status:string;
};
function Card(props: CardProps) {
  console.log(process.env.REACT_APP_BASE_URL + "/" + props.xray_path);
  return (
    <CardContainer>
        <CardSubContainer>
          <Image width={40} src={process.env.REACT_APP_BASE_URL + "/" + props.xray_path} />
          <ImageDetails>
            <LinkButton onClick={()=>window.location.pathname=`/reports/${props.id}`}>{props.id}</LinkButton>
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
