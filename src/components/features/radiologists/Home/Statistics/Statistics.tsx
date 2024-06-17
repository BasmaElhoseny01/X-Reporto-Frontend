import React from "react";
// import { Button, Col, Statistic } from "antd";
// import CountUp from "react-countup";
// import { Statistic } from "antd";

import { StatisticsContainer } from "./Statistics.Styles";
import StatisticCard from "./StatisticCard/StatisticCard";

// interface StatisticsProps {
//   // Define props here
// }

function Statistics() {
  return (
    <StatisticsContainer>
      {/* <StatisticCard
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

      <StatisticCard
        status="all_submitted"
        text="All Submitted Reports"
        count={210}
        action={() => console.log("All Submitted Reports")}
      /> */}

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

      {/* <StatisticCard
        status="all_submitted"
        text="All Submitted Reports"
        count={210}
        action={() => console.log("All Submitted Reports")}
      /> */}
      {/* // <StatisticCard /> */}
      {/* // <StatisticCard /> */}
      {/* // <StatisticCard /> */}
      {/* <Col span={12}> */}
      {/* <Statistic title="Account Balance (CNY)" value={112893} precision={0} /> */}
      {/* <Statistic
          title="Account Balance (CNY)"
          value={<CountUp end={15555} duration={5} />}
          precision={0}
        />
        <Button style={{ marginTop: 16 }} type="primary">
          Recharge
        </Button>
      </Col> */}
      {/* <Statistic
        title="Account Balance (CNY)"
        value={<CountUp end={7} duration={3} style={{ fontSize: "24px" }} />}
        precision={0}
      />
      <CountUp end={7} duration={3} style={{ fontSize: "24px" }} /> */}
    </StatisticsContainer>
  );
}

export default Statistics;
