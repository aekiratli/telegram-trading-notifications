import { useQuery } from 'react-query';

export const useProxyQuery = (queries, queryFn, options) => {
  const data = useQuery(queries, queryFn, {
    ...options,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return data;
};
