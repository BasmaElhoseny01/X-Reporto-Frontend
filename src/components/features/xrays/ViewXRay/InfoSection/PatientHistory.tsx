import React from "react";
// import { HostoryContainer } from "./InfoSection.Styles";
// import Card from "./Card";
import  {FileSearchOutlined}  from "@ant-design/icons";
import { NotFoundContainer, SubTitle } from "./InfoSection.Styles";

function PatientHistory() {
  return (
    <>
      {/* <HostoryContainer>
      <Card />
      <Card />
      <Card />
    </HostoryContainer> */}
    <NotFoundContainer>
      <FileSearchOutlined style={{fontSize:70}}/>
      <SubTitle>No History Found</SubTitle>
    </NotFoundContainer>

    </>
  );
}

export default PatientHistory;
