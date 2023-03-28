import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Loader = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <CircularProgress color="primary" size={80} />
        </Box>
    );
};

export default Loader;
