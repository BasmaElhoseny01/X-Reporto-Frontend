import React, { useState } from 'react';
import Title from 'antd/es/typography/Title';
import LineHeader from '../../../common/LineHeader/LineHeader';
import SearchInput from '../../../common/SearchInput/SearchInput';
import EditInfo from '../../../common/EditInfo/EditInfo';
// import ViewHistory from './ViewHistory';
import ViewHistory from './ViewHistory';
function ViewPatient() {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Title level={2}>View Patient</Title>
      <LineHeader />
      <SearchInput onSearch={handleSearch} />
      {searchValue ? (
        <>
          <Title level={4}>Patient Information</Title>
          <LineHeader />
          <EditInfo searchValue={searchValue} apiPut='`https://jsonplaceholder.typicode.com/users/' apiGet='`https://jsonplaceholder.typicode.com/users/'/>
          <Title level={4}>History</Title>
          <LineHeader />
          <ViewHistory onSearch={handleSearch} />
        </>
      ) : null}
    </div>
  );
}

export default ViewPatient;
