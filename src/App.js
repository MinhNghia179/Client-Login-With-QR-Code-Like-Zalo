import axios from 'axios';
import { useQuery } from 'react-query';
import './App.css';

const BASE_URL = 'http://11.30.11.215:3000/account/authen';

const authenticateStep1 = `${BASE_URL}?t=1`;
const authenticateStep2 = `${BASE_URL}?t=2`;

function App() {
  const { isLoading, error, data } = useQuery('qrCode', () =>
    axios.get(authenticateStep1).then(({ data }) => {
      const response = axios.get(authenticateStep2).then(({ data }) => data);
      return { ...response, ...data };
    }),
  );
  return (
    <div className="App">
      <header className="App-header">
        <h2>Zalo Me</h2>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : !!error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <p>Đăng nhập tài khoản Zalo để kết nối với ứng dụng Zalo Web</p>
            <div className="qrCode">
              <img src={data.base64Image} alt="qrCode" />
            </div>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Quét mã QR bằng Zalo để đăng nhập
            </a>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
