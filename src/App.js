import axios from 'axios';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useQuery } from 'react-query';
import './App.css';

const BASE_URL = 'http://11.30.11.215:3000/account/authen';

const authenticateStep1 = `${BASE_URL}?t=1`;
const authenticateStep2 = `${BASE_URL}?t=2`;

const AUTHENTICATE_KEY_1 = 'qrCode';
const AUTHENTICATE_KEY_2 = 'confirm';

function App() {
  const [qrCode, setQrCode] = useState();
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  useQuery(AUTHENTICATE_KEY_1, () => axios.get(authenticateStep1).then(({ data }) => data), {
    enabled: isEmpty(qrCode),
    onSuccess: setQrCode,
    onError: setError,
  });

  useQuery(AUTHENTICATE_KEY_2, () => axios.get(authenticateStep2).then(({ data }) => data), {
    enabled: isEmpty(userInfo),
    onSuccess: setUserInfo,
    onError: setError,
  });

  return (
    <div className="App">
      <header className="App-header">
        <h2>Zalo Me</h2>
        {!!userInfo ? (
          <>
            <img src={userInfo?.avatar} alt="user name" />
            <span>{userInfo?.display_name}</span>
          </>
        ) : (
          <>
            {!!error ? (
              <p>Error: {error.message}</p>
            ) : (
              <>
                <p>Đăng nhập tài khoản Zalo để kết nối với ứng dụng Zalo Web</p>
                <div className="qrCode">
                  <img src={qrCode?.image} alt="qrCode" />
                </div>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Quét mã QR bằng Zalo để đăng nhập
                </a>
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
