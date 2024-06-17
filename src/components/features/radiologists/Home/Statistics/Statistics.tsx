import React from "react";

// Styled Components
import { StatisticsContainer } from "./Statistics.Styles";

// Components
import StatisticCard from "./StatisticCard/StatisticCard";

// interface StatisticsProps {
//   // Define props here
// }

function Statistics() {
  return (
    <StatisticsContainer>
      <StatisticCard
        status="your_pending"
        text="Your Pending Reports"
        count={2}
        action={() => console.log("Your Pending Reports")}
      />

      <StatisticCard
        status="your_submitted"
        text="Your Submitted Reports"
        count={50}
        action={() => console.log("Your Submitted Cases")}
      />

      <StatisticCard
        status="all_pending"
        text="All Pending Reports"
        count={25}
        action={() => console.log("All Pending Reports")}
      />

      <StatisticCard
        status="all_new"
        text="New Cases"
        count={105}
        action={() => console.log("New Cases")}
      />
    </StatisticsContainer>
  );
}

export default Statistics;
