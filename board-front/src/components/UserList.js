import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

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

    // 사용여부 변경 이벤트 리스너 추가
    const handleUseYnChanged = (event) => {
      fetchUsers(event.detail);
    };

    window.addEventListener('useYnChanged', handleUseYnChanged);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('useYnChanged', handleUseYnChanged);
    };
  }, [searchParams]);

  const fetchUsers = async (useYn) => {
    try {
      const response = await axios.get(`http://localhost:8080/board/list?사용여부=${useYn}`);
      console.log('사용자 목록:', response.data);
      setUsers(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setErrorMessage('API 호출 중 오류가 발생했습니다.');
    }
  };

  const handleInsert = () => {
    if (newUser.사용자ID && newUser.비밀번호) {
      const userData = {
        사용자ID: newUser.사용자ID,
        비밀번호: newUser.비밀번호,
        사용여부: newUser.사용여부,
        최종접속일시: '',
        숫자형: 0.0
      };

      axios.post('http://localhost:8080/board/insert', userData)
        .then(response => {
          console.log('등록 성공:', response.data);
          const currentUseYn = searchParams.get('사용여부') || 'T';
          fetchUsers(currentUseYn);
          setNewUser({ 사용자ID: '', 비밀번호: '', 사용여부: 'Y' });
          setErrorMessage('');
        })
        .catch(error => {
          console.error('등록 중 오류 발생:', error);
          setErrorMessage('등록 중 오류가 발생했습니다.');
        });
    } else {
      setErrorMessage('ID와 비밀번호를 입력해주세요.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div style={{ margin: '20px' }}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      {/* 사용자 등록 폼 */}
      <div style={{ marginBottom: '30px' }}>
        <h2>새 사용자 등록 테스트</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="사용자ID"
            placeholder="사용자 ID"
            value={newUser.사용자ID}
            onChange={handleInputChange}
            style={{ marginRight: '10px' }}
          />
          <input
            type="password"
            name="비밀번호"
            placeholder="비밀번호"
            value={newUser.비밀번호}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="사용여부"
              value="Y"
              checked={newUser.사용여부 === 'Y'}
              onChange={handleInputChange}
            /> 사용
          </label>
          <label>
            <input
              type="radio"
              name="사용여부"
              value="N"
              checked={newUser.사용여부 === 'N'}
              onChange={handleInputChange}
            /> 미사용
          </label>
        </div>
        <button 
          onClick={handleInsert}
          style={{ padding: '5px 10px' }}
        >
          사용자 등록
        </button>
      </div>

      {/* 사용자 목록 테이블 */}
      <h2>사용자 목록</h2>
      <table style={{ width: '50%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>No</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>사용자ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>비밀번호</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>사용여부</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>입력일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.사용자ID}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.비밀번호}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.사용여부}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.입력일 || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;