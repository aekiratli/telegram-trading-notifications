import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, InputBase, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Root = styled('div')({
  padding: '16px',
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

  return (
    <Root>
      <FilterWrapper>
        <FilterInput placeholder="Filter jobs" />
        <SearchIcon />
      </FilterWrapper>
      <Grid container spacing={2}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
            <Skeleton variant="rectangular" height={64} />
          </Grid>
        ))}
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index + 6} item xs={6} sm={4} md={3} lg={2}>
            <Skeleton variant="rectangular" height={64} />
          </Grid>
        ))}
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index + 12} item xs={6} sm={4} md={3} lg={2}>
            <Skeleton variant="rectangular" height={64} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default SkeletonLogs;
