import { useState } from 'react';
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
import { Delete, Add, Circle } from '@mui/icons-material';
import FilterInput from '../components/filter';
import { useFetchTrades } from '../api/queries';
import SkeletonJobs from '../components/skeleton/JobsTable';
import { convertTimestampToDate } from '../utils/dates';
import AddDialog from '../components/tradeDialogs/newTradeDialog';
import DeleteDialog from '../components/tradeDialogs/DeleteDialog';

const Trades = () => {
  const {
    data: tradesData,
    isLoading: isTradesLoading,
  } = useFetchTrades();
  const [page, setPage] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [trade, setTrade] = useState({});

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleNameFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (entry) => {
    setTrade(entry);
    setIsDeleteDialogOpen(true);
  };

  if (isTradesLoading) return <SkeletonJobs />;
  return (
    <TableContainer style={{ paddingLeft: '20px' }} component={Paper}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <FilterInput onChange={handleNameFilter} />
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          variant="contained"
          startIcon={<Add />}
          color="primary"
        >
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
            <TableCell>Risk</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...tradesData]
            .filter(function doFilter(item) {
              if (nameFilter.length > 0) return item.name.includes(nameFilter);
              else return item;
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.symbol}</TableCell>
                <TableCell>
                  <Button
                    color={entry.market === 'buy' ? 'success' : 'error'}
                    variant="contained"
                  >
                    {entry.market.toUpperCase()}
                  </Button>
                </TableCell>
                <TableCell>{entry.price}</TableCell>
                <TableCell>{convertTimestampToDate(entry.date)}</TableCell>
                <TableCell>
                  {entry.channels.map((channel) => {
                    return (
                      <Button
                        key={channel.name}
                        sx={{ marginLeft: '5px' }}
                        color="secondary"
                        variant="contained"
                      >
                        {channel.name}
                      </Button>
                    );
                  })}
                </TableCell>
                <TableCell>
                  {entry.risk === 'low' && <Circle sx={{ color: 'green' }} />}
                  {entry.risk === 'medium' && (
                    <Circle sx={{ color: 'orange' }} />
                  )}
                  {entry.risk === 'high' && <Circle sx={{ color: 'red' }} />}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(entry)}>
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
        count={tradesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        trade={trade}
      />
    </TableContainer>
  );
};

export default Trades;
