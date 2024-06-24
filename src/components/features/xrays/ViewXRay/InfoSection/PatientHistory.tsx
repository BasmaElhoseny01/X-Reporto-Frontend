import React from "react";
import { HostoryContainer } from "./InfoSection.Styles";
import Card from "./Card";

function PatientHistory() {
  return (
    <HostoryContainer>
      <Card />
      <Card />
      <Card />
    </HostoryContainer>
  );
}

export default PatientHistory;
