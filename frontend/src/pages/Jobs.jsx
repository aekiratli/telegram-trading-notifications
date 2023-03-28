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
  Box,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import FilterInput from '../components/filter';
import { useFetchJobs, useFetchJobTypes, useFetchSymbols } from '../api/queries';
import SkeletonJobs from '../components/skeleton/JobsTable';
import AddDialog from '../components/jobDialogs/AddDialog';
import EditDialog from '../components/jobDialogs/EditDialog';
import DeleteDialog from '../components/jobDialogs/DeleteDialog';
import { JobContext } from '../components/jobDialogs/JobContext';

const Job = () => {
  const { data, isLoading } = useFetchJobs()
  const { data: jobData, isLoading: isJobDataLoading } = useFetchJobTypes()
  const { data: symbolData } = useFetchSymbols()

  const [page, setPage] = useState(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobType, setJobType] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = (index) => {
    //setData((prevData) => prevData.filter((_, i) => i !== index));
    setIsDeleteDialogOpen(true)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const values = {
    jobType,
    setJobType,
    symbolData,
    jobData,
  }

  if (isLoading)
    return (<SkeletonJobs />)

  return (
    <JobContext.Provider value={values}>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <FilterInput />
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
              <TableCell>Config</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.config?.symbol}</TableCell>
                  <TableCell>{entry.config?.candle_interval}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{JSON.stringify(entry.config)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => { setIsEditDialogOpen(true) }}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
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
      </TableContainer>
    </JobContext.Provider>
  );
};

export default Job;
