import axios from 'axios';
import { useQuery } from 'react-query';

const BASE_URL = 'localhost:3000';
const KEY = 'fetchQrCode';

export const useFetchQrCode = () => {
  const { isLoading, data, isSuccess, isError } = useQuery(
    KEY,
    axios.get(`${BASE_URL}/account/authen?t=1`).then(({ data }) => data)
  );
  return { isLoading, data, isSuccess, isError };
};
