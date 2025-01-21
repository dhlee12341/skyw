import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserList from './components/UserList';
import GridList from './components/GridList';

// 조회 조건 컴포넌트
function SearchCondition({ useYn, setUseYn, handleSearch }) {
  return (
    <div style={{ margin: '20px' }}>
      <h2>조회조건 테스트</h2>
      <label>조회조건 : </label>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          value="T"
          checked={useYn === 'T'}
          onChange={(e) => setUseYn(e.target.value)}
        /> 전체
      </label>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          value="Y"
          checked={useYn === 'Y'}
          onChange={(e) => setUseYn(e.target.value)}
        /> 사용
      </label>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          value="N"
          checked={useYn === 'N'}
          onChange={(e) => setUseYn(e.target.value)}
        /> 미사용
      </label>
      <button onClick={handleSearch}>조회</button>
    </div>
  );
}

// App.js로 이동하는 버튼 컴포넌트
function NavigateToAppButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // App.js 페이지로 이동
  };

  return (
    <button onClick={handleClick} style={{ margin: '10px' }}>
      Main
    </button>
  );
}

function App() {
  const [indexContent, setIndexContent] = useState('');
  const [useYn, setUseYn] = useState('T');

  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(response => {
        setIndexContent(response.data);
      })
      .catch(error => {
        console.error('index.html 로딩 중 오류 발생:', error);
      });
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('사용여부', useYn);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
    window.dispatchEvent(new CustomEvent('useYnChanged', { detail: useYn }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div dangerouslySetInnerHTML={{ __html: indexContent }} />
        } />

        <Route path="/board/list" element={
          <div>
            <NavigateToAppButton />
            <SearchCondition useYn={useYn} setUseYn={setUseYn} handleSearch={handleSearch} />
            <UserList />
          </div>
        } />

        <Route path="/board/grid" element={
          <div>
            <NavigateToAppButton />
            {/* <SearchCondition useYn={useYn} setUseYn={setUseYn} handleSearch={handleSearch} /> */}
            <GridList />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
