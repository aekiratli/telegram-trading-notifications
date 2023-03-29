
export const API_URL = {
    login: () => `/users/login`,
    listJobs: () => `/jobs/list`,
    addJob: () => `/jobs/add`,
    editJob: () => `/jobs/edit`,
    deleteJob: (id) => `/jobs/delete/${id}`,
    listCoins: () => `/utils/list/coins`,
    listSymbol: () => `/utils/list/symbol`,
    addSymbols: () => `/utils/add/symbols`,
    listJobTypes: () => `/job_type/list`,
}