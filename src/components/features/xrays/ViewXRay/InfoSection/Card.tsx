import React from "react";
import { CardContainer, CardDate, CardSecondSubContainer, CardSubContainer, ImageDetails, SubTitle } from "./InfoSection.Styles";
import LinkButton from "../../../../common/LinkButton/LinkButton";
import { Image } from "antd";
import {FolderOpenFilled} from "@ant-design/icons";

function Card() {
  return (
    <CardContainer>
        <CardSubContainer>
          <Image width={40} src={process.env.PUBLIC_URL+"/test.jpg"} />
          <ImageDetails>
            <LinkButton  >12321655615</LinkButton>
            <CardDate>Created at : 13-5-2024 5:00pm</CardDate>
          </ImageDetails>
        </CardSubContainer>
        <CardSecondSubContainer>
          <SubTitle>New</SubTitle>
          <FolderOpenFilled style={{ fontSize: 20 }} />
        </CardSecondSubContainer>
      </CardContainer>
  );
} 

export default Card;
