import { useQuery, useQueryClient } from 'react-query';

export const useProxyQuery = (queries, queryFn, options) => {
  const data = useQuery(queries, queryFn, {...options, refetchOnWindowFocus: false});
  return data;
};
