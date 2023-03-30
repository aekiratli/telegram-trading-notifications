import { Table, TableBody, TableCell, TableRow, Skeleton } from '@mui/material';

function ChannelTableSkeleton() {
    const rows = [1, 2, 3, 4]; // Number of rows to show

    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row}>
                    <TableCell>
                        <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell align="right">
                        <Skeleton variant="circle" width={32} height={32} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ChannelTableSkeleton;
