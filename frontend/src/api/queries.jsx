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
  
  export const useFetchCoins = (options) => {
    return useProxyQuery(
      "list_coins",
      () => apiFetch(API_URL.listCoins()),
      options
    );
  };
  
  export const useFetchSymbols = (options) => {
    return useProxyQuery(
      "list_symbol",
      () => apiFetch(API_URL.listSymbol()),
      options
    );
  };
  
  export const useFetchJobTypes = (options) => {
    return useProxyQuery(
      "list_job_type",
      () => apiFetch(API_URL.listJobTypes()),
      options
    );
  };
  