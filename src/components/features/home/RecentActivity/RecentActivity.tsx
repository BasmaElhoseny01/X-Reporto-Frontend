/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "../../../../services/apiService";
// Types
import { Activity, ActivityType } from "../../../../types/activity";
import { ActivityCardsContainer } from "../Home.Styles";
import ActivityCard from "../../../common/ActivityCard/ActivityCard";
import { Button, List } from "antd";
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
const fetchRecentActivity = async (
  params: FetchRecentActivityParams = { limit: 5, skip: 0 }
) => {
  try {
    // params.sort = "-created_at";

    const response = await axios.get("/api/v1/activities", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
  }
};

// // Example usage
// fetchRecentActivity({
//   activity_type: "view",
//   limit: 5,
//   skip: 0,
//   sort: "created_at",
// });

function RecentActivity() {
  const user = useSelector((state: MainState) => state.user);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState<Activity[]>([]);
  const [data, setData] = useState<Activity[]>([]);

  const [skip, setSkip] = useState(0);
  const limit = 5;

  useEffect(() => {
    // Fetch recent activity
    if (user?.type == "doctor") {
      fetchRecentActivity().then((response) => {
        setInitLoading(false);
        setData(response);
        setList(response);
      });
    }
  }, [user]);

  const onLoadMore = () => {
    setLoading(true);
    fetchRecentActivity({ limit, skip }).then((response) => {
      const newData = data.concat(response);
      setData(newData);
      setList(newData);
      setLoading(false);
      setSkip(skip + limit);
      window.dispatchEvent(new Event("resize"));
    });
  };

  //   const onLoadMore = () => {
  //     setLoading(true);
  // setList(
  //   data.concat(
  //     [...new Array(count)].map(() => ({
  //       loading: true,
  //       name: {},
  //       picture: {},
  //     }))
  //   )
  // );
  // fetch(fakeDataUrl)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     const newData = data.concat(res.results);
  //     setData(newData);
  //     setList(newData);
  //     setLoading(false);
  //     // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //     // In real scene, you can using public method of react-virtualized:
  //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //     window.dispatchEvent(new Event("resize"));
  //   });
  //   };

  const loadMore =
    !initLoading && !loading ? (
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
        renderItem={(item) => (
          // <List.Item
          //   actions={[
          //     <a key="list-loadmore-edit">edit</a>,
          //     <a key="list-loadmore-more">more</a>,
          //   ]}
          // >
          //   <Skeleton avatar title={false} loading={item.loading} active>
          //     <List.Item.Meta
          //       avatar={<Avatar src={item.picture.large} />}
          //       title={<a href="https://ant.design">{item.name?.last}</a>}
          //       description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          //     />
          <ActivityCard key={item.id} type={item.activity_type} />
          //   </Skeleton>

          // </List.Item>
        )}
      />
    </ActivityCardsContainer>
  );
}

export default RecentActivity;
