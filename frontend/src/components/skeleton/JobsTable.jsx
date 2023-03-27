import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Skeleton,
  } from '@mui/material';

function SkeletonJobs() {
  return (
    <TableContainer>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} ml={2} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SkeletonJobs;
