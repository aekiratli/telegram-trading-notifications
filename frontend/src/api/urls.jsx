
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
    listChannels: () => `/channels/list`,
    addChannel: () => `/channels/add`,
    addTrade: () => `/trades/add`,
    listTrade: () => `/trades/list`,
    deleteTrade: (id) => `/trades/delete/${id}`,
    deleteChannel: (id) => `/channels/delete/${id}`,
}