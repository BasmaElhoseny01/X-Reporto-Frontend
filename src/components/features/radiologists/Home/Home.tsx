import React from "react";
import Title from "antd/es/typography/Title";

// Assets
import Poster from "../../../../assets/images/home_poster.svg";
import {
  HomeContainer,
  HomeLeftSideContainer,
  HomeRightSideContainer,
} from "./Home.Styles";

import Statistics from "./Statistics/Statistics";
import RecentActivity from "./RecentActivity/RecentActivity";
import { Flex } from "antd";
// import { RecentActivitySectionContainer } from "./RecentActivity/RecentActivity.Styles";

function Home() {
  return (
    <div style={{ padding: "10px" }}>
      {/* Main Section */}
      <HomeContainer>
        <HomeLeftSideContainer
          style={{
            position: "relative",
            height: "100%",
            backgroundColor: "aliceblue",
          }}
        >
          <Flex>
            <Flex style={{ display: "flex", flexDirection: "column" }}>
              <Title level={2}>Welcome, Dr. Rousseau!</Title>
              <Title level={5} style={{ fontWeight: 500, marginTop: "-10px" }}>
                Wishing you a productive and successful day ahead.
              </Title>
              <Statistics />
            </Flex>

            {/* Image */}
          </Flex>

          {/* Statics */}
          {/* <Statistics /> */}
          <img
            src={Poster}
            alt="poster"
            style={{
              height: "350px",
              position: "absolute",
              bottom: "0px",
              right: "0px",
            }}
          />
        </HomeLeftSideContainer>

        {/* <RecentActivity /> */}
        <HomeRightSideContainer style={{ backgroundColor: "aliceblue" }}>
          <RecentActivity />
        </HomeRightSideContainer>
      </HomeContainer>

      {/* Recent Activity Section */}
      {/* <RecentActivitySectionContainer> */}
      {/* <img src={Poster} alt="poster" style={{ height: "400px" }} /> */}
      {/* <RecentActivity /> */}

      {/* <img src={Poster} alt="poster" style={{ height: "400px" }} /> */}
      {/* <Title level={3}>Recent Activity</Title>
        <LineHeader /> */}
      {/* </RecentActivitySectionContainer> */}
    </div>
  );
}

export default Home;
