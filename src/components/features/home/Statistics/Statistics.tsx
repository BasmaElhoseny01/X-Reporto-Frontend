import React, { useEffect, useState } from "react";

// Services
import axios from "../../../../services/apiService";

// Styled Components
import { StatisticsContainer } from "./Statistics.Styles";

// Components
import StatisticCard from "./StatisticCard/StatisticCard";

// Types
type statisticsType = {
  new: number;
  incomplete: number;
  pending: number;
  completed: number;
};

// Server Fetch
const fetchStatistics = async () => {
  const stats = { new: 0, incomplete: 0, pending: 0, completed: 0 };
  try {
    // New studies
    let response = await axios.get("/api/v1/studies/new/count");
    stats.new = response.data.count;

    // InComplete studies
    response = await axios.get("/api/v1/studies/incomplete/count");
    stats.incomplete = response.data.count;

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
  const [statistics, setStatistics] = useState<statisticsType>({
    new: 0,
    incomplete: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchStatistics().then((response) => {
      setStatistics(response);
    });
  }, []);

  // TODO Add Actions to the buttons
  return (
    <StatisticsContainer>
      <StatisticCard
        status="new"
        text="New Reports"
        count={statistics?.new}
        action={() => console.log("New Cases")}
      />
      <StatisticCard
        status="incomplete"
        text="Pending Reports"
        count={statistics?.incomplete}
        action={() => console.log("Your Pending Reports")}
      />

      <StatisticCard
        status="pending"
        text="My Pending Reports"
        count={statistics?.pending}
        action={() => console.log("Your Pending Cases")}
      />

      <StatisticCard
        status="completed"
        text="My Completed Reports"
        count={statistics?.completed}
        action={() => console.log("My Completed Reports")}
      />
    </StatisticsContainer>
  );
}

export default Statistics;
