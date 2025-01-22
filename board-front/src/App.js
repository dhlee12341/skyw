import 'devextreme/dist/css/dx.light.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { SelectBox } from 'devextreme-react/select-box';
import { Button } from 'devextreme-react/button';
import UserList from './components/UserList';
import GridList from './components/GridList';

function SearchCondition({ useYn, setUseYn, handleSearch }) {
  const statusOptions = [
    { text: '전체', value: 'T' },
    { text: '사용', value: 'Y' },
    { text: '미사용', value: 'N' }
  ];

  return (
    <div style={{ margin: '20px' }}>
      <h2>조회조건 테스트</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <label>조회조건 : </label>
        <SelectBox
          items={statusOptions}
          value={useYn}
          onValueChanged={(e) => setUseYn(e.value)}
          displayExpr="text"
          valueExpr="value"
          width={120}
        />
        <Button
          text="조회"
          type="default"
          onClick={handleSearch}
          width={100}
        />
      </div>
    </div>
  );
}

function NavigateToAppButton() {
  const navigate = useNavigate();

  return (
    <Button
      text="Main"
      type="default"
      onClick={() => navigate('/')}
      style={{ margin: '10px' }}
      width={100}
    />
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
    if (!useYn) return; // Add validation
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('사용여부', useYn);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
    window.dispatchEvent(new CustomEvent('useYnChanged', { detail: useYn }));
  };

  return (
    <Router>
      <div className="dx-viewport">
        <Routes>
          <Route 
            path="/" 
            element={
              <div dangerouslySetInnerHTML={{ __html: indexContent }} />
            } 
          />

          <Route 
            path="/board/list" 
            element={
              <div>
                <NavigateToAppButton />
                <SearchCondition 
                  useYn={useYn} 
                  setUseYn={setUseYn} 
                  handleSearch={handleSearch} 
                />
                <UserList />
              </div>
            } 
          />

          <Route 
            path="/board/grid" 
            element={
              <div>
                <NavigateToAppButton />
                <GridList />
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;