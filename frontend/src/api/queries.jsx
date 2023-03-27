import apiFetch from './fetcher';
import { API_URL } from './urls';
import { useProxyQuery } from './useQueryProxy';

export const useFetchJobs = (options) => {
    return useProxyQuery(
      "list_jobs",
      () => apiFetch(API_URL.listJobs()),
      options
    );
  };
  