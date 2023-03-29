import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import Select from 'react-select';
import { useFetchCoins, useFetchSymbols } from "../api/queries";
import { API_URL } from "../api/urls";
import apiFetch from "../api/fetcher";
import { useAppContext } from "../AppContext";

const Settings = () => {
  const {setSnackbar} = useAppContext()
  const { data: coinData, isLoading: isCoinDataLoading } = useFetchCoins()
  const { data: symbolData, isLoading: isSymbolDataLoading } = useFetchSymbols()
  const [selectOptions, setSelectOptions] = useState([]);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const [initialAlreadySelected, setInitialAlreadySelected] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const handleOnSave = (event) => {
    console.log(event)
    apiFetch(API_URL.addSymbols(), [...alreadySelected].map((item) => item.label))
    .then(response => {
      console.log(response)
      setSnackbar({ open: true, message: "Symbols Updated", type: 'success' })
      setInitialAlreadySelected([...alreadySelected])
    })
    .catch(error => {
      setSnackbar({ open: true, message: "Something went wrong", type: 'error' })
    });
  };

  const handleOnChange = (e) => {
    setAlreadySelected(e)
  }

  useEffect(() => {
    if (!isCoinDataLoading && !isSymbolDataLoading) {
      const coinDataCopy = [...coinData]
      const symbolDataCopy = [...symbolData]
      const defVal = coinDataCopy?.filter((item) => symbolDataCopy?.map((i) => i?.name).includes(item?.symbol)).map((item) => ({ label: item?.symbol, value: item?.symbol }))
      const options = coinDataCopy?.map(coin => { return ({ value: coin?.symbol, label: coin?.symbol }) })
      setAlreadySelected(defVal)
      setInitialAlreadySelected(defVal)
      setSelectOptions(options)
    }
  }, [coinData, symbolData]);

  useEffect(() => {
    if (JSON.stringify(alreadySelected) === JSON.stringify(initialAlreadySelected))
      setIsSaveDisabled(true)
    else
      setIsSaveDisabled(false)
  }, [alreadySelected, initialAlreadySelected]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
        <Typography variant="h5" gutterBottom>
          Symbols
        </Typography>
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
              color: 'black'
            }),
            menu: base => ({
              ...base,
              // override border radius to match the box
              borderRadius: 0,
              // kill the gap
              backgroundColor: '#37474f',
              marginTop: 0
            }),
          }}
        />
        <Button onClick={handleOnSave} disabled={isSaveDisabled} style={{ marginTop: "15px" }} type="submit" variant="contained">
          Save
        </Button>
    </Box>
  );
};

export default Settings;
