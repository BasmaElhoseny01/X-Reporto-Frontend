import React from "react";

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
  HomeTopTitleContainer,
  HomeTopLeftContainer,
  HomeTopRightContainer,
} from "./Home.Styles";

// Components
import LineHeader from "../../common/LineHeader/LineHeader";
import Statistics from "./Statistics/Statistics";
import RecentActivity from "./RecentActivity/RecentActivity";

// Assets
import Poster from "../../../assets/images/home_poster.svg";

function Home() {
  const user = useSelector((state: MainState) => state.user);

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
          <RecentActivity />
        </HomeBottomContainer>
      )}
    </HomeContainer>
  );
}

export default Home;
