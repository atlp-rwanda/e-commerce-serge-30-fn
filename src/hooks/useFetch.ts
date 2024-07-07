import axios from 'axios';
import useSWR from 'swr';
import { useToken } from './useToken';

export const baseUrl = import.meta.env.VITE_DEPLOYED_URL;
//axios.defaults.withCredentials = true;
const useFetch = (url: string) => {
  const { token } = useToken();
  const fullUrl = `${baseUrl}${url}`;
  const fetcher = (fullUrl: string) =>
    axios
      .get(fullUrl, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => res.data);

  const { data, error, mutate, isLoading, isValidating } = useSWR(
    fullUrl,
    fetcher,
  );

  return {
    data,
    isLoading,
    error,
    mutate,
    isValidating,
  };
};

export default useFetch;
