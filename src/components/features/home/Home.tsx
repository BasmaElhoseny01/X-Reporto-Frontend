import React from "react";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../state";

// Services
import axios from "../../../services/apiService";

// Ant Design
import Title from "antd/es/typography/Title";
import { message } from "antd";

// Styled Components
import {
  HomeContainer,
  HomeTopContainer,
  HomeBottomContainer,
  HomeTopTitleContainer,
  HomeTopLeftContainer,
  HomeTopRightContainer,
  RunBackGroundButton
} from "./Home.Styles";

// Components
import LineHeader from "../../common/LineHeader/LineHeader";
import Statistics from "./Statistics/Statistics";
import RecentActivity from "./RecentActivity/RecentActivity";
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";

// Assets
import Poster from "../../../assets/images/home_poster.svg";

function Home() {
  const user = useSelector((state: MainState) => state.user);
  const token = useSelector((state: MainState) => state.token);

  const handleRunBackGound = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
    .post(`api/v1/studies/run_backgroud`,{ })
    .then((response) => {
      console.log("Run Background Response", response);
      message.success("Running Background updated!",);
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      message.error("Failed to update data. Please try again.");
    });
    console.log("Run Background");
  };
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
        <RunBackGroundButton>
          <PrimaryButton onClick={handleRunBackGound}>Run Background</PrimaryButton>
        </RunBackGroundButton>
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
