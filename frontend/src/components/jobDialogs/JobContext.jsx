import { createContext, useContext } from 'react';

export const JobContext = createContext();

export function useJobContext() {
  return useContext(JobContext);
}
