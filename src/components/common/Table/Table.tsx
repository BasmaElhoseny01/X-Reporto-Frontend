import { Flex, Input, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { PlusOutlined } from "@ant-design/icons";
import LineHeader from "../LineHeader/LineHeader";
import { bindActionCreators } from "redux";
import { ChangeTableSearch } from "../../../state/ActionCreators";
import { useDispatch } from "react-redux";

type GeneralTableColumn = {
  title: string;
  dataIndex: string;
  key: string;
  filteredValue?: string[];
  // eslint-disable-next-line
  onFilter?: (value: any, record: any) => any;
  // eslint-disable-next-line
  sorter?: (a: any, b: any) => any;
}

type GeneralTableProps = {
  columns: GeneralTableColumn[];
  api: string;
  title: string;
  filterColumns: { [key: string]: string };
  // eslint-disable-next-line
  action: (record: any, rowIndex: any) => void;
  addNew: () => void;
}

const GeneralTable = (props:GeneralTableProps) => {
  
  const [page, setPage] = useState(1);
  const[dataSource, setDataSource] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // axios.get(`${props.api}?page=${page}&pageSize=${pageSize}`)
    axios.get(`${props.api}`)
    .then((response) => {
      setDataSource(response.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
    }, [page]);

  const dispatch = useDispatch();
  const ChangeTable = bindActionCreators(ChangeTableSearch, dispatch);

  return (
  <Flex vertical>
    <Flex style={{justifyContent: "space-between"}}>
      <Typography.Title level={3}>{props.title}</Typography.Title>
    </Flex>
    <LineHeader />
    <Flex  style={{padding: "0px 20px",margin:"0px 0px 15px 0px",alignItems:"center",justifyContent: "space-between"}}>
      <Flex style={{justifyContent: "space-between"}}>
        <Input.Search 
        placeholder="Search"  
        onChange={(e) => ChangeTable(e.target.value)}
        onSearch={(value) => ChangeTable(value)}
        allowClear
        />
      </Flex>
      <Flex style={{justifyContent: "space-between"}}>
        <PrimaryButton onClick={() => props.addNew()} >
          <PlusOutlined /> Add New
        </PrimaryButton>
      </Flex>
    </Flex>
    <Table
      columns={props.columns}
      dataSource={dataSource}
      loading={loading}
      style={{color: "black !important"}}
      pagination={{ 
        current: page,
        pageSize: 5,
        total: dataSource.length,
        onChange: (page) => {
          setPage(page);
        },
        showSizeChanger: false, 
        position: ['bottomCenter'],
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            props.action(record, rowIndex);
          },
          style: { cursor: 'pointer' } 
        };
      }}
    />
  </Flex>
  );
};

export default GeneralTable;