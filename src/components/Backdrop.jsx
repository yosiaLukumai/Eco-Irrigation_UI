import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function BackdropProcess({ opens = false }) {
    const [open, setOpen] = useState(opens);
    useEffect(() => {
        if (opens) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [opens]);

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer +1500 }}
                open={open}
            >
                <Box display={"flex"} alignContent={"center"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                    <CircularProgress  color="inherit" />
                    <Typography pt="1.2rem">Processing...</Typography>
                </Box>

            </Backdrop>
        </div>
    );
}