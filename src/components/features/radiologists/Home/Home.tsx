import React from "react";
import {
  HomeContainer,
  HomeTopContainer,
  HomeBottomContainer,
  ActivityCardsContainer,
  HomeTopTitleContainer,
} from "./Home.Styles";
import Title from "antd/es/typography/Title";
import LineHeader from "../../../common/LineHeader/LineHeader";
import ActivityCard from "../../../common/ActivityCard/ActivityCard";
import Statistics from "./Statistics/Statistics";

function Home() {
  return (
    <HomeContainer>
      <HomeTopContainer>
        <HomeTopTitleContainer>
          <Title level={2}>Welcome, Dr. Rousseau!</Title>
          <Title level={5} style={{ fontWeight: 500, marginTop: "-10px" }}>
            Wishing you a productive and successful day ahead.
          </Title>
        </HomeTopTitleContainer>
        {/* Statistics */}
        <Statistics />
      </HomeTopContainer>
      <HomeBottomContainer>
        <Title level={3}>
          Recent Activity
        </Title>
        <LineHeader />
        {/* Max only 8  */}
        <ActivityCardsContainer>
          <ActivityCard type="submit" />
          <ActivityCard type="view" />
          <ActivityCard type="view" />
          <ActivityCard type="draft" />
          <ActivityCard type="submit" />
          <ActivityCard type="draft" />
          <ActivityCard type="view" />
          <ActivityCard type="draft" />
        </ActivityCardsContainer>
      </HomeBottomContainer>
    </HomeContainer>
  );
}

export default Home;
