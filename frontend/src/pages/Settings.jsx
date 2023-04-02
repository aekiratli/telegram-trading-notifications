import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Tooltip,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Select from 'react-select';
import {
  useFetchCoins,
  useFetchSymbols,
  useFetchChannels,
} from '../api/queries';
import { API_URL } from '../api/urls';
import apiFetch from '../api/fetcher';
import { useAppContext } from '../AppContext';
import { styled } from '@mui/material/styles';
import { Edit, Delete, Add} from '@mui/icons-material';
import AddDialog from '../components/settingsDialog/AddChannelDialog';
import DeleteDialog from '../components/settingsDialog/DeleteChannelDialog';
import ChannelTableSkeleton from '../components/skeleton/ChannelTable';

const TableContainerStyled = styled(TableContainer)({
  maxWidth: 600,
  margin: '0 auto',
});

const Settings = () => {
  const { setSnackbar } = useAppContext();
  const { data: coinData, isLoading: isCoinDataLoading } = useFetchCoins();
  const { data: symbolData, isLoading: isSymbolDataLoading } =
    useFetchSymbols();
  const { data: channelData, isLoading: isChannelDataLoading } =
    useFetchChannels();

  const [isAddChannelDialogOpen, setIsAddChannelDialogOpen] = useState(false);
  const [isDeleteChannelDialogOpen, setIsDeleteChannelDialogOpen] =
    useState(false);
  const [channel, setChannel] = useState({});

  const [selectOptions, setSelectOptions] = useState([]);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const [initialAlreadySelected, setInitialAlreadySelected] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const handleOnSave = (event) => {
    apiFetch(
      API_URL.addSymbols(),
      [...alreadySelected].map((item) => item.label)
    )
      .then((response) => {
        setSnackbar({
          open: true,
          message: 'Symbols Updated',
          type: 'success',
        });
        setInitialAlreadySelected([...alreadySelected]);
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: 'Something went wrong',
          type: 'error',
        });
      });
  };

  const handleOnChange = (e) => {
    setAlreadySelected(e);
  };

  const handleDelete = (channel) => {
    setChannel(channel);
    setIsDeleteChannelDialogOpen(true);
  };

  useEffect(() => {
    if (!isCoinDataLoading && !isSymbolDataLoading) {
      const coinDataCopy = [...coinData];
      const symbolDataCopy = [...symbolData];
      const defVal = coinDataCopy
        ?.filter((item) =>
          symbolDataCopy?.map((i) => i?.name).includes(item?.symbol)
        )
        .map((item) => ({ label: item?.symbol, value: item?.symbol }));
      const options = coinDataCopy?.map((coin) => {
        return { value: coin?.symbol, label: coin?.symbol };
      });
      setAlreadySelected(defVal);
      setInitialAlreadySelected(defVal);
      setSelectOptions(options);
    }
  }, [coinData, symbolData, isCoinDataLoading,  isSymbolDataLoading]);

  useEffect(() => {
    if (
      JSON.stringify(alreadySelected) === JSON.stringify(initialAlreadySelected)
    )
      setIsSaveDisabled(true);
    else setIsSaveDisabled(false);
  }, [alreadySelected, initialAlreadySelected]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box display="flex" justifyContent="space-between" p={1}>
        <Typography variant="h5" gutterBottom>
          Symbols
        </Typography>
        <Button
          startIcon={<Edit />}
          onClick={handleOnSave}
          disabled={isSaveDisabled}
          type="submit"
          variant="contained"
        >
          Save Symbols
        </Button>
      </Box>
      <Select
        isMulti
        value={alreadySelected}
        onChange={handleOnChange}
        isLoading={isCoinDataLoading || isSymbolDataLoading}
        name="colors"
        options={selectOptions}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#607d8b',
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#37474f',
            color: 'black',
          }),
          menu: (base) => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            backgroundColor: '#37474f',
            marginTop: 0,
          }),
        }}
      />

      <Divider style={{ paddingTop: '25px' }} />
      <Box display="flex" justifyContent="space-between" p={1}>
        <Typography flexGrow={1} variant="h5" gutterBottom>
          Channels
        </Typography>
        <Button
          onClick={() => setIsAddChannelDialogOpen(true)}
          variant="contained"
          startIcon={<Add />}
          color="primary"
        >
          Add Channel
        </Button>
      </Box>
      <TableContainerStyled>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Chat ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {isChannelDataLoading ? (
            <ChannelTableSkeleton />
          ) : (
            <TableBody>
              {channelData.map((channel, index) => (
                <TableRow key={index}>
                  <TableCell>{channel.name}</TableCell>
                  <TableCell>{channel.chat_id}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(channel)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainerStyled>
      <AddDialog
        open={isAddChannelDialogOpen}
        setOpen={setIsAddChannelDialogOpen}
      />
      <DeleteDialog
        open={isDeleteChannelDialogOpen}
        setOpen={setIsDeleteChannelDialogOpen}
        channel={channel}
      />
    </Box>
  );
};

export default Settings;
