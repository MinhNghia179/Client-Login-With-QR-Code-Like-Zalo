import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'http://11.30.11.215:8085/account/authen';

const authenticateStep1 = `${BASE_URL}?t=1`;
const authenticateStep2 = `${BASE_URL}?t=2`;
const authenticateStep3 = `${BASE_URL}?t=3`;

function App() {
  const [qrCode, setQrCode] = useState();
  const [error, setError] = useState();
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const getNewQRCode = async () => {
    try {
      const response1 = await axios.post(authenticateStep1);
      if (response1.data) {
        setQrCode(response1.data);
        const response2 = await axios.post(authenticateStep2, { code: response1.data.code });
        if (response2.data) {
          setUserInfo(response2.data);
          getTokenFromUser();
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  const getTokenFromUser = async () => {
    try {
      const response = await axios.post(authenticateStep3);
      setToken(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!!userInfo) {
      getTokenFromUser();
    }
  }, [userInfo]);

  useEffect(() => {
    getNewQRCode();
  }, []);

  console.log(token);

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
              <div className="card-container">
                <p>Đăng nhập tài khoản Zalo để kết nối với ứng dụng Zalo Web</p>
                {userInfo?.isExpired && (
                  <>
                    <span className="error-message">Mã QR đã hết hạn, vui lòng tải lại mã mới</span>
                    <div className="card-expired">
                      <span className="qr-text">Mã QR hết hạn</span>
                      <button className="btn-qrCode" onClick={getNewQRCode}>
                        Lấy mã mới
                      </button>
                    </div>
                  </>
                )}
                <div className={`qrCode ${userInfo?.isExpired && 'expired'}`}>
                  <img src={qrCode?.image} alt="qrCode" />
                </div>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Quét mã QR bằng Zalo để đăng nhập
                </a>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
