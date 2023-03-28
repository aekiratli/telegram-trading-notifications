import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import Select from 'react-select';
import { useFetchCoins, useFetchSymbols } from "../api/queries";
import Loader from "../components/loader";

const Settings = () => {
  const { data: coinData, isLoading: isCoinDataLoading } = useFetchCoins({
    cacheTime: 300000,
  })
  const { data: symbolData, isLoading: isSymbolDataLoading } = useFetchSymbols({
    cacheTime: 300000,
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };
  const handleOnChange = (e) => {
  } 

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Symbols
        </Typography>
        <Select
          defaultValue={coinData?.filter((item) => symbolData?.map((i) => i?.name).includes(item?.symbol)).map((item) => ({ label: item?.symbol, value: item?.symbol }))}
          isMulti
          onChange={handleOnChange}
          isLoading={isCoinDataLoading || isSymbolDataLoading}
          name="colors"
          options={coinData?.map(coin => { return ({ value: coin?.symbol, label: coin?.symbol }) })}
        />
        <Button style={{ marginTop: "15px" }} type="submit" variant="contained">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default Settings;
