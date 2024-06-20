import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
const NotFound = () => {

    const navigate = useNavigate()
    const theme = useTheme();
    
    return (
        <>
            <Box sx={{ overflow: "hidden", minHeight: "96vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Stack direction="column" spacing={2}>
                    <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bolder", color: "#3a0ca3" }}>404</Typography>
                    <Typography variant="h5" sx={{ fontSize: "1.6rem", color: theme.palette.info }}> Op's it seems you have been lost... </Typography>
                    <Box sx={{ alignSelf: "center" }}>
                        <Button onClick={()=> navigate("/", {replace:true})} sx={{ padding: "0.8rem 1.2rem" }} startIcon={<ArrowBack />} variant="contained">Go Back Home</Button>
                    </Box>
                </Stack>

            </Box>
        </>
    );
}

export default NotFound;

