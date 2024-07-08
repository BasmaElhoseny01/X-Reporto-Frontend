/*eslint-disable */
import React, { useEffect, useState } from "react";

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

// Styled Components
import { StatisticsContainer } from "./Statistics.Styles";

// Components
import StatisticCard from "./StatisticCard/StatisticCard";

// Paths Utils
import { reDirectToCases } from "../../../../pages/paths.utils";
// import { useNavigate } from "react-router-dom";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

// Types
type statisticsType = {
  new: number;
  incomplete: number;
  pending: number;
  completed: number;
};

// Server Fetch
const fetchStatistics = async (isDoctor: boolean, token: string) => {
  const stats = { new: 0, incomplete: 0, pending: 0, completed: 0 };
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // New studies
    let response = await axios.get("/api/v1/studies/new/count");
    stats.new = response.data.count;

    // InComplete studies
    response = await axios.get("/api/v1/studies/incomplete/count");
    stats.incomplete = response.data.count;

    if (!isDoctor) return stats;

    //Your Pending studies
    response = await axios.get("/api/v1/studies/pending/count");
    stats.pending = response.data.count;

    //Your Completed studies
    response = await axios.get("/api/v1/studies/completed/count");
    stats.completed = response.data.count;

    return stats;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

function Statistics() {
  // Navigate
  const { navigateToCases } = useCustomNavigate();
  // const navigate = useNavigate();

  // Redux States
  const user = useSelector((state: MainState) => state.user);
  const token = useSelector((state: MainState) => state.token);

  const [statistics, setStatistics] = useState<statisticsType>({
    new: 0,
    incomplete: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchStatistics(user?.type == "doctor", token).then((response) => {
      setStatistics(response);
    });
  }, [user]);

  // TODO Add Actions to the buttons
  return (
    <StatisticsContainer>
      <StatisticCard
        status="new"
        text="Unassigned Cases"
        count={statistics?.new}
        action={() => {
          navigateToCases("unassigned");
        }}
      />
      <StatisticCard
        status="incomplete"
        text="Pending Cases"
        count={statistics?.incomplete}
        action={() => {
          navigateToCases("pending");
        }}
      />

      {user?.type == "doctor" ? (
        <>
          <StatisticCard
            status="pending"
            text="My Pending Cases"
            count={statistics?.pending}
            action={() => {
              navigateToCases("pending", user?.id);
            }}
          />

          <StatisticCard
            status="completed"
            text="My Completed Cases"
            count={statistics?.completed}
            action={() => {
              navigateToCases("completed", user?.id);
            }}
          />
        </>
      ) : null}
    </StatisticsContainer>
  );
}

export default Statistics;
