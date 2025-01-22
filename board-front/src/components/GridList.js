import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

function GridList() {
  const [grids, setGrids] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchGrids();
  }, []);

  const fetchGrids = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/board/grid`);
      console.log('Grid 목록:', response.data);
      setGrids(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setErrorMessage('API 호출 중 오류가 발생했습니다.');
    }
  };

  const formatDate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatBirthDate = (rowData) => {
    return new Date(rowData.birthDate).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatBalance = (rowData) => {
    return rowData.balance?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div style={{ margin: '20px' }}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Grid 목록</h2>
      <DataGrid
        dataSource={grids}
        showBorders={true}
        columnAutoWidth={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
      >
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
          showInfo={true}
        />
        
        <Column dataField="id" caption="ID" alignment="center" />
        <Column dataField="name" caption="이름" />
        <Column dataField="email" caption="이메일" />
        <Column dataField="iage" caption="나이" alignment="center" />
        <Column
          dataField="createdAt"
          caption="생성일"
          calculateCellValue={formatDate}
        />
        <Column
          dataField="isActive"
          caption="활성화"
          alignment="center"
          calculateCellValue={(rowData) => rowData.isActive ? '예' : '아니오'}
        />
        <Column
          dataField="balance"
          caption="잔액"
          alignment="right"
          calculateCellValue={formatBalance}
        />
        <Column
          dataField="birthDate"
          caption="생년월일"
          alignment="center"
          calculateCellValue={formatBirthDate}
        />
        <Column dataField="ipAddress" caption="IP 주소" />
      </DataGrid>
    </div>
  );
}

export default GridList;