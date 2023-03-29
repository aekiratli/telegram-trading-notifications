import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, InputBase, Paper, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Root = styled('div')({
  padding: '16px',
});

const JobButton = styled(Button)({
  textTransform: 'none',
  width: '100%',
});

const FilterWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: '16px',
});

const FilterInput = styled(InputBase)({
  marginRight: '16px',
});

const SkeletonLogs = () => {
  // example data for demonstration purposes
  const jobs = [
    { id: 1, name: 'Job 1' },
    { id: 2, name: 'Job 2' },
    { id: 3, name: 'Job 3' },

  ];


  return (
    <Root>
      <FilterWrapper>
        <FilterInput placeholder="Filter jobs" />
        <SearchIcon />
      </FilterWrapper>
      <Grid container spacing={2}>
        {
          Array.from(Array(6)).map((_, index) => (
            <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
              <Skeleton variant="rectangular" height={64} />
            </Grid>
          ))
        }
        {
          Array.from(Array(6)).map((_, index) => (
            <Grid key={index+6} item xs={6} sm={4} md={3} lg={2}>
              <Skeleton variant="rectangular" height={64} />
            </Grid>
          ))
        }
        {
          Array.from(Array(6)).map((_, index) => (
            <Grid key={index+12} item xs={6} sm={4} md={3} lg={2}>
              <Skeleton variant="rectangular" height={64} />
            </Grid>
          ))
        }
      </Grid>
    </Root>
  );
};

export default SkeletonLogs;
