import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

type GeneralTableColumn = {
  title: string;
  dataIndex: string;
  key: string;
}

type GeneralTableProps = {
  columns: GeneralTableColumn[];
  api: string;
}

const GeneralTable = (props:GeneralTableProps) => {
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
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
    }, [page, pageSize]);

  return (
    <>
      <style>
          {`
            .ant-select-item-option {
              color: black !important;
            }
          `}
        </style>
      <Table
        columns={props.columns}
        dataSource={dataSource}
        loading={loading}
        style={{color: "black !important"}}
        pagination={{ 
          current: page,
          pageSize: pageSize,
          total: dataSource.length,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          position: ['bottomCenter'],
        }}
      />
    </>

  );
};

export default GeneralTable;