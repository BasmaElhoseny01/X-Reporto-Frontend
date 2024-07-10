import { Flex, Input, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../services/apiService";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { PlusOutlined } from "@ant-design/icons";
import LineHeader from "../LineHeader/LineHeader";
import { bindActionCreators } from "redux";
import { ChangeTableSearch } from "../../../state/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../../../state";

type GeneralTableColumn = {
  title: string;
  dataIndex: string;
  key: string;
  filteredValue?: string[];
  // eslint-disable-next-line
  onFilter?: (value: any, record: any) => any;
  // eslint-disable-next-line
  sorter?: (a: any, b: any) => any;
};

type GeneralTableProps = {
  columns: GeneralTableColumn[];
  api: string;
  title: string;
  // eslint-disable-next-line
  filterColumns: String[];
  // eslint-disable-next-line
  action: (record: any, rowIndex: any) => void;
  addNew: () => void;
};

const GeneralTable = (props: GeneralTableProps) => {
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: MainState) => state.token);

  useEffect(() => {
    setLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`${props.api}skip=${5 * (page - 1)}&limit=500`)
      .then((response) => {
        console.log("Response for", props.api, response.data);
        response.data.map((ele: any) => {
          props.filterColumns.map((filter) => {
            delete ele[filter.toString()];
          });
        });
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Set fetching to false after 0.5 seconds
      });
  }, [page]);

  const dispatch = useDispatch();
  const ChangeTable = bindActionCreators(ChangeTableSearch, dispatch);

  return (
    <Flex vertical>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </Flex>
      <LineHeader />
      <Flex
        style={{
          padding: "0px 20px",
          margin: "0px 0px 15px 0px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex style={{ justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Search"
            onChange={(e) => ChangeTable(e.target.value)}
            onSearch={(value) => ChangeTable(value)}
            allowClear
          />
        </Flex>
        <Flex style={{ justifyContent: "space-between" }}>
          <PrimaryButton onClick={() => props.addNew()}>
            <PlusOutlined /> Add New
          </PrimaryButton>
        </Flex>
      </Flex>
      <Table
        columns={props.columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: page,
          pageSize: 5,
          total: dataSource.length,
          onChange: (page) => {
            setPage(page);
          },
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
        // scroll={{ y: 100 }} // Adjust height as needed
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // check if the click is on the row or on the action button
              const target = event.target as HTMLElement;
              if (target.tagName === "TD") {
                // console.log(record, rowIndex);
                props.action(record, rowIndex);
              } else {
                return;
              }
            },
            style: { cursor: "pointer" },
          };
        }}
      />
    </Flex>
  );
};

export default GeneralTable;
