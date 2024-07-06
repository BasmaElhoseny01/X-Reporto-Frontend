/* eslint-disable */

import React, { useEffect } from "react";

import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

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

// Server
import { fetchRecentActivity } from "./Home.Server";

// Types
import { Employee } from "../../../../types/employee";

function Home() {
  // Get token from redux
  const token = useSelector((state: MainState) => state.token);

  const [me, setMe] = React.useState({} as Employee);

  useEffect(() => {
    axios
      .get("/api/v1/employees/me")
      .then((response) => {
        setMe(response.data);
        console.log(response.data); // Debug
        console.log(me); // Debug
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch recent activity
    fetchRecentActivity();
  }, [token]);

  return (
    <HomeContainer>
      <HomeTopContainer>
        <HomeTopLeftContainer>
          {/* Welcome */}
          <HomeTopTitleContainer>
            <Title level={2}>
              Welcome, {me.type == "doctor" ? <>Dr.</> : null}{" "}
              {me.employee_name}!
            </Title>
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
        {/* Recent Activity */}
        <Title level={3}>Recent Activity</Title>
        <LineHeader />
        {/* Max only 8  */}
        <ActivityCardsContainer>
          <ActivityCard type="submit" />
          <ActivityCard type="draft" />
          <ActivityCard type="view" />
          <ActivityCard type="view" />
          <ActivityCard type="submit" />
          <ActivityCard type="submit" />
          <ActivityCard type="submit" />
          <ActivityCard type="submit" />
          {/* <ActivityCard type="submit" /> */}
          {/* <ActivityCard type="draft" /> */}
        </ActivityCardsContainer>
      </HomeBottomContainer>
    </HomeContainer>
  );
}

export default Home;
