import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Configuration from "../../App/config";

const Verification = () => {
    const [loading, setloading] = useState(true)
    const isMounted = useRef(false);
    const [verified, setVerfied] = useState(false)
    const [message, setMessage] = useState("")

    const { emailKey } = useParams()
    const navigator = useNavigate()
    const navigateTo = (path) => {
        navigator(path)
    }

    useEffect(() => {

        if (!isMounted.current) {
            isMounted.current = true;
            async function verifiyAdmin() {
                const result = await fetch(`${Configuration.backendUrl}/user/verify/admin/${emailKey}`);
                const response = await result.json()
                if (response?.Success) {
                    setloading(false)
                    setVerfied(true)
                    setMessage(response?.Error)
                } else {
                    setloading(false)
                    setVerfied(false)
                    setMessage(response?.Error)
                }
            }
            try {
                verifiyAdmin()
            } catch (error) {
                setloading(false)
                setVerfied(false)
            }
        }

    }, [])

    const MessageBox = () => {
            {verified ? 'Verified...' : {message}}
    }


    return (<>

        <Box pt={{ xs: 2, md: 6, }} sx={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center", }} textAlign={"center"}>
            {
                loading ? <Box>
                    <CircularProgress />
                    <Typography variant="h6" pt="0.3rem" sx={{ color: "#1d3557" }}>
                        Processing...
                    </Typography>

                </Box> :
                    <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", width:"100%", alignItems: "center" }}>
                        <Grid container  className="" alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 5 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "100%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
                            <Grid sx={{width:"100%"}} display={"flex"} justifyContent={"center"} md={7} xs={12} item>
                                <Typography textAlign={"center"} sx={{width:"100%"}} variant="h6">
                                    <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "430" }} >  {   verified ? 'Verified...' : message} </span>
                                </Typography>
                            </Grid>
                            <Grid display={"flex"} justifyContent={"center"} md={12} xs={12} item>
                                <Button variant="outlined">
                                    <Typography textAlign={"center"} variant="subtitle" onClick={() => navigateTo("/")}>
                                        <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "430" }} >Login Here</span>
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
            }


        </Box>
    </>);
}

export default Verification;