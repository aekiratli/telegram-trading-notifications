import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Tooltip,
  Box,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, Add, Cable } from '@mui/icons-material';
import FilterInput from '../components/filter';
import { useFetchJobs, useFetchJobTypes, useFetchSymbols } from '../api/queries';
import SkeletonJobs from '../components/skeleton/JobsTable';
import AddDialog from '../components/jobDialogs/AddDialog';
import EditDialog from '../components/jobDialogs/EditDialog';
import DeleteDialog from '../components/jobDialogs/DeleteDialog';
import { JobContext } from '../components/jobDialogs/JobContext';
import { INTERVALS } from '../utils/binance';
import ConfigDialog from '../components/jobDialogs/ConfigDialog';
import { convertTimestampToDate } from '../utils/dates';

const Job = () => {
  const { data, isLoading } = useFetchJobs()
  const { data: jobData, isLoading: isJobDataLoading } = useFetchJobTypes()
  const { data: symbolData } = useFetchSymbols()

  const [page, setPage] = useState(0);
  const [nameFilter, setNameFilter] = useState('');

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  const [jobType, setJobType] = useState()
  const [job, setJob] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [interval, setInterval] = useState();
  const [symbol, setSymbol] = useState();
  const [candles, setCandles] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleDelete = (id) => {
    const job_ = data.find(job => job.id === id)
    setJob(job_)
    setIsDeleteDialogOpen(true)
  };

  const handleEdit = (id) => {
    const job_ = data.find(job => job.id === id)
    setJob(job_)
    setValue(job_.config.rsi_value)
    setIsEditDialogOpen(true)
  };

  const handleConfig = (id) => {
    const job_ = data.find(job => job.id === id)
    setJob(job_)
    setIsConfigDialogOpen(true)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNameFilter = (e) => {
    console.log(e)
    setNameFilter(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const values = {
    setValue,
    value,
    interval,
    setInterval,
    symbol,
    setSymbol,
    candles,
    setCandles,
    name,
    setName,
    jobType,
    setJobType,
    symbolData,
    jobData,
    job,
  }

  if (isLoading)
    return (<SkeletonJobs />)
  return (
    <JobContext.Provider value={values}>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <FilterInput onChange={handleNameFilter}/>
          <Button onClick={() => { setIsAddDialogOpen(true) }} variant="contained" startIcon={<Add />} color="primary">
            Add Job
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Interval</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Last Run</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...data]
              .filter(function doFilter(item) {
                if (nameFilter.length > 0)
                  return item.name.includes(nameFilter)
                else
                  return item
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.config?.pair}</TableCell>
                  <TableCell>{INTERVALS.find(interval_ => interval_.value === entry.config?.candle_interval)?.label}</TableCell>
                  <TableCell>{entry.type.toUpperCase()}</TableCell>
                  <TableCell>{convertTimestampToDate(entry.config.last_run)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Show Config">
                      <IconButton onClick={() => handleConfig(entry.id)}>
                        <Cable />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(entry.id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(entry.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
        <DeleteDialog open={isDeleteDialogOpen} setOpen={setIsDeleteDialogOpen} />
        <EditDialog open={isEditDialogOpen} setOpen={setIsEditDialogOpen} />
        <ConfigDialog open={isConfigDialogOpen} setOpen={setIsConfigDialogOpen} />
      </TableContainer>
    </JobContext.Provider>
  );
};

export default Job;