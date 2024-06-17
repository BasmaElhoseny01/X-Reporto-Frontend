import React from "react";

// Ant Design
import Title from "antd/es/typography/Title";

// Styled Components
import {
  HomeContainer,
  HomeTopContainer,
  HomeBottomContainer,
  ActivityCardsContainer,
  HomeTopTitleContainer,
  HomeTopLeftContainer,
  HomeTopRightContainer,
} from "./Home.Styles";

// Components
import LineHeader from "../../../common/LineHeader/LineHeader";
import Statistics from "./Statistics/Statistics";
import ActivityCard from "../../../common/ActivityCard/ActivityCard";

// Assets
import Poster from "../../../../assets/images/home_poster.svg";

function Home() {
  return (
    <HomeContainer>
      <HomeTopContainer>
        <HomeTopLeftContainer>
          {/* Welcome */}
          <HomeTopTitleContainer>
            <Title level={2}>Welcome, Dr. Rousseau!</Title>
            <Title level={5} style={{ fontWeight: 500, marginTop: "-10px" }}>
              Wishing you a productive and successful day ahead.
            </Title>
          </HomeTopTitleContainer>
          {/* Statistics */}
          <Statistics />
        </HomeTopLeftContainer>
        <HomeTopRightContainer>
          <img src={Poster} alt="poster" height={"100%"} />
        </HomeTopRightContainer>
      </HomeTopContainer>

      <HomeBottomContainer>
        ..
        {/* Recent Activity */}
        <Title level={3}>Recent Activity</Title>
        <LineHeader />
        {/* Max only 8  */}
        <ActivityCardsContainer>
          <ActivityCard type="submit" />
          <ActivityCard type="view" />
          <ActivityCard type="view" />
          {/* <ActivityCard type="draft" /> */}
          {/* <ActivityCard type="submit" />
          <ActivityCard type="draft" />
          <ActivityCard type="view" />
          <ActivityCard type="draft" /> */}
        </ActivityCardsContainer>
      </HomeBottomContainer>
    </HomeContainer>
  );
}

export default Home;
