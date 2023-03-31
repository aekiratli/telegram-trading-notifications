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
import { useFetchJobs, useFetchJobTypes, useFetchSymbols, useFetchChannels } from '../api/queries';
import SkeletonJobs from '../components/skeleton/JobsTable';
import AddDialog from '../components/tradeDialogs/newTradeDialog';

const Trades = () => {
  //const { data, isLoading, isError } = useFetchJobs()
  const [page, setPage] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const isLoading = false;
    const data = [{market: "buy", symbol:"some symbol", price:5,date:123123, channels: [{id:1, name:"sa"}]}]
  const [rowsPerPage, setRowsPerPage] = useState(5);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNameFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (e) => {
    console.log("Deleting")
  };

  if (isLoading)
    return (<SkeletonJobs />)
  return (
      <TableContainer style={{paddingLeft: "20px"}} component={Paper}>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <FilterInput onChange={handleNameFilter}/>
          <Button onClick={() => (setIsAddDialogOpen(true))} variant="contained" startIcon={<Add />} color="primary">
            New Order
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Market</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Channels</TableCell>
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
                  <TableCell>{entry.symbol}</TableCell>
                  <TableCell>{entry.market}</TableCell>
                  <TableCell>{entry.price}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.channels.map(channel => {return (<Button key={channel.name} sx={{marginLeft:"5px"}} color='secondary' variant='contained'>{channel.name}</Button>)})}</TableCell>
                  <TableCell align="right">
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
        <AddDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen}/>
      </TableContainer>
  );
};

export default Trades;
