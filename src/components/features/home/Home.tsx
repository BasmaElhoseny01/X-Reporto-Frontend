/* eslint-disable */

import React, { useEffect } from "react";

import axios from "../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../state";

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
import LineHeader from "../../common/LineHeader/LineHeader";
import Statistics from "./Statistics/Statistics";
import ActivityCard from "../../common/ActivityCard/ActivityCard";

// Assets
import Poster from "../../../assets/images/home_poster.svg";

// Types
import { Employee } from "../../../types/employee";

export const fetchRecentActivity = async () => {
  try {
    const response = await axios.get("/api/v1/activities");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
  }
};

function Home() {
  // Get token from redux
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  useEffect(() => {
    // Fetch recent activity
    if (user?.type == "doctor") {
      fetchRecentActivity().then((response) => {
        console.log(response);
      });
    }
    console.log("Fetching User", user);
  }, [user, token]);

  return (
    <HomeContainer>
      <HomeTopContainer>
        <HomeTopLeftContainer>
          {/* Welcome */}
          <HomeTopTitleContainer>
            <Title level={2}>
              Welcome, {user?.type == "doctor" ? <>Dr.</> : null}{" "}
              {user?.employee_name}!
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

      {user?.type == "doctor" && (
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
      )}
    </HomeContainer>
  );
}

export default Home;
