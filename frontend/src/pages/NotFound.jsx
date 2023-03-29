import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import ExtensionIcon from '@mui/icons-material/Extension';

const NotFoundPage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ display: 'flex', alignItems: 'center' }}>
          404
          <Box sx={{ ml: 2 }}>
            <ExtensionIcon sx={{ fontSize: '10rem' }} />
          </Box>
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Page Not Found</Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
