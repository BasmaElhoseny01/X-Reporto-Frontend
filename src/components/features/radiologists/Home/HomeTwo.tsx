/* eslint-disable */
import React from "react";
import {
  HomeTwoBottomContainer,
  // HomeTwoBottomContainer,
  HomeTwoContainer,
  HomeTwoTopContainer,
} from "./Home.Styles";
// import RecentActivity from "./RecentActivity/RecentActivity";
import Title from "antd/es/typography/Title";
// import Title from "antd/es/typography/Title";

// Assets
import Statistics from "./Statistics/Statistics";
import { LineHeader } from "../../patients/NewPatients/NewPatients.style";
import RecentActivity from "./RecentActivity/RecentActivity";
// import { LineHeader } from "../../patients/NewPatients/NewPatients.style";
// import ActivityCard from "../../../common/ActivityCard/ActivityCard";
// import {
//   HomeContainer,
//   HomeLeftSideContainer,
//   HomeRightSideContainer,
// } from "./Home.Styles";

// import Statistics from "./Statistics/Statistics";
// import RecentActivity from "./RecentActivity/RecentActivity";
// import { Flex } from "antd";
// // import { RecentActivitySectionContainer } from "./RecentActivity/RecentActivity.Styles";

function HomeTwo() {
  return (
    <HomeTwoContainer>
      {/* Top Section */}
      <HomeTwoTopContainer>
        <div>
          <Title level={2}>Welcome, Dr. Rousseau!</Title>
          <Title level={5} style={{ fontWeight: 500, marginTop: "-10px" }}>
            Wishing you a productive and successful day ahead.
          </Title>
          <Statistics />
        </div>
      </HomeTwoTopContainer>

      {/* Bottom Section */}
      <HomeTwoBottomContainer>
        <Title level={3}>Recent Activity</Title>
        <LineHeader />
        <RecentActivity />
      </HomeTwoBottomContainer>
    </HomeTwoContainer>
  );
}

export default HomeTwo;
