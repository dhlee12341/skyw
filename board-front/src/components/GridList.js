import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 생년월일 포맷팅 함수
  const formatBirthDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div style={{ margin: '20px' }}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Grid 목록</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>No</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>이름</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>이메일</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>나이</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>생성일</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>활성화</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>잔액</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>생년월일</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>IP 주소</th>
          </tr>
        </thead>
        <tbody>
          {grids.map((grid, index) => (
            <tr key={grid.id}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{grid.id}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{grid.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{grid.email}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{grid.iage}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {formatDate(grid.createdAt)}
              </td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                {grid.isActive ? '예' : '아니오'}
              </td>
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>
                {grid.balance?.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
              </td> */}
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>
                {grid.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                {formatBirthDate(grid.birthDate)}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{grid.ipAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridList;