// NOT USED
/* eslint-disable no-unused-vars */
import React from "react";
// import { RecentActivitySectionContainer } from "./RecentActivity.Styles";
// import LineHeader from "../../../../common/LineHeader/LineHeader";
// import Title from "antd/es/typography/Title";
import ActivityCard from "../../../../common/ActivityCard/ActivityCard";

function RecentActivity() {
  return (
    <>
      {/* <Title level={3}>Recent Activity</Title>
      <LineHeader /> */}
      <ActivityCard type="submit" />
      <ActivityCard type="view" />
      <ActivityCard type="draft" />
      <ActivityCard type="view" />
      <ActivityCard type="submit" />
      <ActivityCard type="draft" />
      <ActivityCard type="draft" />
      <ActivityCard type="draft" />
      <ActivityCard type="draft" />
      <ActivityCard type="draft" />
      <ActivityCard type="view" />
    </>
  );
}

export default RecentActivity;
