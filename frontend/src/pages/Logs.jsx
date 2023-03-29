import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFetchJobs } from '../api/queries';
import SkeletonLogs from '../components/skeleton/LogsGrid';
import LogDialog from '../components/logDialogs';
import FilterInput from '../components/filter';

const Root = styled('div')({
  padding: '16px',
});


const JobButton = styled(Button)({
  textTransform: 'none',
  width: '100%',
  color: '#fff',
  backgroundColor: '#212121',
  '&:hover': {
    backgroundColor: '#424242',
  },
  '&:active': {
    backgroundColor: '#616161',
  },
  '&:disabled': {
    color: '#9e9e9e',
    backgroundColor: '#424242',
  },
});

const FilterWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: '16px',
});

// const FilterInput = styled(InputBase)({
//   marginRight: '16px',
//   borderColor: 'white',
// });

const Logs = () => {

  const [isLogDialogOpen, setIsLogDialogOpen] = React.useState(false);

  const [job, setJob] = React.useState({});
  
  const handleClick = (job) => {
    setJob(job)
    setIsLogDialogOpen(true)
  }
  const { data: jobsData, isLoading: isJobsLoading } = useFetchJobs()

  if (isJobsLoading)
    return (<SkeletonLogs />)

  return (
    <Root>
      <FilterWrapper>
        <FilterInput placeholder="Filter jobs" />
      </FilterWrapper>
      <Grid container spacing={2}>
        {jobsData.map((job) => (
          <Grid key={job.id} item xs={6} sm={4} md={3} lg={2}>
            <JobButton onClick={() => handleClick(job)} variant="outlined">
              {job.name}
            </JobButton>
          </Grid>
        ))}
      </Grid>
      <LogDialog open={isLogDialogOpen} setOpen={setIsLogDialogOpen} job={job}/>
    </Root>
  );
};

export default Logs;
