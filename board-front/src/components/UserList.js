import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
// import { Form, SimpleItem } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import { SelectBox } from 'devextreme-react/select-box';
import 'devextreme/dist/css/dx.light.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [newUser, setNewUser] = useState({
    사용자ID: '',
    비밀번호: '',
    사용여부: 'Y'
  });

  useEffect(() => {
    const useYn = searchParams.get('사용여부') || 'T';
    fetchUsers(useYn);
  }, [searchParams]);

  useEffect(() => {
    const handleUseYnChanged = (event) => {
      if (event.detail) {
        fetchUsers(event.detail);
      }
    };

    window.addEventListener('useYnChanged', handleUseYnChanged);
    return () => {
      window.removeEventListener('useYnChanged', handleUseYnChanged);
    };
  }, []);

  const fetchUsers = async (useYn) => {
    try {
      if (!useYn) return;
      const response = await axios.get(`http://localhost:8080/board/list?사용여부=${useYn}`);
      setUsers(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setErrorMessage('API 호출 중 오류가 발생했습니다.');
    }
  };

  const handleInsert = async () => {
    if (newUser.사용자ID && newUser.비밀번호) {
      const userData = {
        사용자ID: newUser.사용자ID,
        비밀번호: newUser.비밀번호,
        사용여부: newUser.사용여부,
        최종접속일시: '',
        숫자형: 0.0
      };

      try {
        const response = await axios.post('http://localhost:8080/board/insert', userData);
        console.log('등록 성공:', response.data);
        const currentUseYn = searchParams.get('사용여부') || 'T';
        fetchUsers(currentUseYn);
        setNewUser({ 사용자ID: '', 비밀번호: '', 사용여부: 'Y' });
        setErrorMessage('');
      } catch (error) {
        console.error('등록 중 오류 발생:', error);
        setErrorMessage('등록 중 오류가 발생했습니다.');
      }
    } else {
      setErrorMessage('ID와 비밀번호를 입력해주세요.');
    }
  };

  const statusOptions = [
    { text: '사용', value: 'Y' },
    { text: '미사용', value: 'N' }
  ];

  return (
    <div style={{ margin: '20px' }}>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h2>새 사용자 등록</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ width: '100px' }}>사용자ID:</label>
            <input
              type="text"
              value={newUser.사용자ID}
              onChange={(e) => setNewUser({ ...newUser, 사용자ID: e.target.value })}
              placeholder="사용자 ID"
              style={{ width: '200px', padding: '5px' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ width: '100px' }}>비밀번호:</label>
            <input
              type="password"
              value={newUser.비밀번호}
              onChange={(e) => setNewUser({ ...newUser, 비밀번호: e.target.value })}
              placeholder="비밀번호"
              style={{ width: '200px', padding: '5px' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ width: '100px' }}>사용여부:</label>
            <SelectBox
              items={statusOptions}
              value={newUser.사용여부}
              onValueChanged={(e) => setNewUser({ ...newUser, 사용여부: e.value })}
              displayExpr="text"
              valueExpr="value"
              width={200}
            />
          </div>
          
          <div style={{ marginTop: '10px', marginLeft: '110px' }}>
            <Button
              text="사용자 등록"
              type="default"
              onClick={handleInsert}
              width={120}
              height={30}
            />
          </div>
        </div>
      </div>

      <h2>사용자 목록</h2>
      <DataGrid
        dataSource={users}
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
        
        <Column 
          dataField="사용자ID"
          caption="사용자ID"
          width={150}
        />
        <Column 
          dataField="비밀번호"
          caption="비밀번호"
          width={150}
        />
        <Column 
          dataField="사용여부"
          caption="사용여부"
          width={100}
          alignment="center"
        />
        <Column 
          dataField="입력일"
          caption="입력일"
          width={150}
          alignment="center"
          calculateCellValue={(rowData) => rowData.입력일 || '-'}
        />
      </DataGrid>
    </div>
  );
}

export default UserList;