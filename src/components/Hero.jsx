import { Grid, Stack, styled, Paper, Box, Typography, Button } from "@mui/material";
import HeroImage from "/water4.png"



const Hero = () => {
    return (<>
        <Box sx={{ py: { xs: 3, md: 12 } }}>
            <Grid container direction="row" spacing={1} >
                <Grid item xs={12} md={7} sx={{ mt: { xs: 1, md: 6 },ml:{xs:2, md:0} }}>
                    <Stack spacing={{ xs: 1, sm: 2 }}   direction="column" useFlexGap flexWrap="wrap">
                        <Box>
                            <Typography variant="h3" sx={{ display: '', fontSize: { xs: "2.3rem", md: "3.2", lg: "5.3rem" }, fontWeight: "500" }}>
                                <span style={{ color: '#1d3557' }}> Better Water</span>
                                <span style={{ color: '#419bda' }}> Management</span>
                            </Typography>
                        </Box>
                        <Box sx={{ maxWidth: "610px" }}>
                            <Typography variant="subtitle" sx={{fontSize:"1.3rem", fontWeight:"410", opacity:"0.75" ,color:"primary"}}>
                                Monitor all water resources in realtime, Manage your customers, <br />
                                Remote control, Accurate measurements. Analytics. <br />
                                track water losses.
                            </Typography>
                        </Box>
                        <Box>
                            <Button sx={{background:"#419bda", '&:hover': {
                                background:"#606c38"
                            }, color:"white", padding:"1.1rem 3rem", borderRadius:"19px", fontSize:"1.3rem", fontWeight:"900"}}> Join us Today</Button>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item md={5} alignSelf={"end"}>
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignContent: "center", justifyContent: "flex-end" }}>
                        <Box sx={{ maxHeight: "600px", maxWidth: "600%" }}>
                            <img src={HeroImage} alt="Hero Image" width={"100%"} height={"100%"} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    </>);
}

export default Hero;