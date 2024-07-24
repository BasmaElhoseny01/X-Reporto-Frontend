/* eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "../../../../services/apiService";
// Types
import { Activity, ActivityType } from "../../../../types/activity";
import { ActivityCardsContainer } from "../Home.Styles";
import ActivityCard from "../../../common/ActivityCard/ActivityCard";
import { Button, Divider, List, message, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

// Interface props for ActivityCard
interface RecentActivityProps {}

interface FetchRecentActivityParams {
  activity_type?: ActivityType;
  limit?: number;
  skip?: number;
  sort?: string;
}
// Fetch Server Data
const fetchRecentActivity = async (params: FetchRecentActivityParams) => {
  try {
    // params.sort = "-created_at";
    const response = await axios.get("/api/v1/activities", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
  }
};

function RecentActivity() {
  const user = useSelector((state: MainState) => state.user);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState<Activity[]>([]);
  const [data, setData] = useState<Activity[]>([]);
  const [end, setEnd] = useState(false);

  // State to track loading status for each item
  const [itemLoading, setItemLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [skip, setSkip] = useState(0);
  const limit = 10;

  useEffect(() => {
    // Fetch recent activity
    if (user?.type == "doctor") {
      fetchRecentActivity({ skip: skip, limit: limit }).then((response) => {
        console.log("response", response);
        setInitLoading(false);
        setData(response);
        setList(response);
        if (response) {
          setSkip(skip + response.length);

          if (response.length < limit) {
            setEnd(true);
          }
        }
      });
    }
  }, [user]);

  const onLoadMore = () => {
    setLoading(true);
    fetchRecentActivity({ limit, skip }).then((response) => {
      if (response.length == 0 || response.length < limit) {
        setEnd(true);
      } else {
        setEnd(false);
      }
      const newData = data.concat(response);
      setData(newData);
      setList(newData);
      setSkip(skip + limit);
      window.dispatchEvent(new Event("resize"));

      // Turn off loading status
      setLoading(false);

      // Show success message
      message.success(`${response.length} more items loaded!`);
    });
  };

  const loadMore = end ? (
    <Divider plain>It is all, nothing more 🤐</Divider>
  ) : !initLoading && !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null;

  return (
    <ActivityCardsContainer>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => <ActivityCard key={item.id} activity={item} />}
      />
    </ActivityCardsContainer>
  );
}

export default RecentActivity;
