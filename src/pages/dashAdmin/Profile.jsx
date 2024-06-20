import { Grid, Box, Avatar, Typography, Button } from "@mui/material";
import { useState } from "react";
import { retriveData } from "../../Utils/Localstorage";
import List from '@mui/material/List';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import Person4Icon from '@mui/icons-material/Person4';
import ListItemm from "../../components/ListItem";
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import Configuration from "../../App/config";


const Profile = () => {

    const [user, setUser] = useState(retriveData(Configuration.localStorageKey))
    console.log(user);
    return (<>
        <Box sx={{ pt: { xs: "2.3rem", md: "2.5rem" }, px: { md: "3rem", xs: "0.2rem" }, height: { md: "92.5vh", xs: "" } }}>

            <Grid container justifyContent={"flex-end"} sx={{ pb: "1rem" }}>
                <Grid className="" sx={{ display: "flex", justifyContent: "flex-end" }} item xs={9} md={3} >
                    <Box sx={{}}>
                        <Button variant="contained" sx={{ textTransform: "none", padding: "0.5rem 1.2rem", fontWeight: "bold", borderRadius: "1.2rem" }} className="hoveredButton">
                            <EditIcon sx={{ pr: "0.3rem" }} />
                            Edit Information
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}> {/* Apply spacing for all breakpoints */}
                <Grid className="" xs={12} md={4} item >
                    <Box sx={{ boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", background: "white", borderRadius: "1.4rem", p: "0.2rem 0.4rem" }}>
                        <Grid container py={1}>
                            <Grid md={12} xs={12} item>
                                <Typography variant="h5" sx={{ pt: "1.1rem", textAlign: "center" }}>
                                    <span style={{ color: "#1d3558", fontWeight: "1000" }}> User Information</span>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid justifyContent={"center"} alignContent={"center"} container spacing={2} direction={"column"}>

                            <Grid item>
                                <Avatar sx={{ boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", width: "120px", color: "#1d3558", height: "120px" }}>
                                </Avatar>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} direction={"row"}>

                            <Grid md={12} xs={12} item>
                                <Typography variant="h5" sx={{ pt: "1rem", textAlign: "center" }}>
                                    <span style={{ color: "#1d3558", fontWeight: "900" }}>@</span>
                                    <span style={{ color: "#fb8500", fontWeight: "900" }}> {user?.firstname + "-" + user?.lastname}</span>

                                </Typography>
                            </Grid>
                            <Grid item md={12} xs={12} >
                                <List sx={{ width: '100%', maxWidth: 360, fontSize: "1.3rem" }}>
                                    <ListItemm Icon={Person4Icon} Value={user?.firstname} Property={"First Name"}></ListItemm>
                                    <ListItemm Icon={Person4Icon} Value={user?.lastname} Property={"Last Name"}></ListItemm>
                                    <ListItemm Icon={AlternateEmailIcon} Value={user?.email} Property={"Email"}></ListItemm>
                                    <ListItemm Icon={PhoneIcon} Value={user?.phone} Property={"Phone"}></ListItemm>
                                </List>
                            </Grid>

                        </Grid>

                    </Box >

                </Grid>
                {/* <Grid className="" item xs={12} md={8} >
                    <Box sx={{ boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", background: "white", borderRadius: "1.4rem", p: "0.2rem 0.4rem" }}>
                        <Grid container py={1}>
                            <Grid md={12} xs={12} item>
                                <Typography variant="h5" sx={{ pt: "1.1rem", textAlign: "center" }}>
                                    <span style={{ color: "#1d3558", fontWeight: "1000" }}> Company Information</span>
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} direction={"row"}>
                            <Grid item md={12} xs={12} >
                                <List sx={{ width: '100%', maxWidth: 360, fontSize: "1.3rem" }}>
                                    <ListItemm Icon={BusinessIcon} Value={user?.Company?.name} Property={"Company Name"}></ListItemm>
                                    <ListItemm Icon={PhoneIcon} Value={user?.Company?.phone} Property={"Company Phone"}></ListItemm>
                                    <ListItemm Icon={LocationOnIcon} Value={user?.Company?.location} Property={"Location"}></ListItemm>
                                </List>
                            </Grid>

                        </Grid>
                    </Box >
                </Grid> */}
            </Grid>

            <Box sx={{ mb: { xs: "0", md: "3rem" } }}></Box>
        </Box>
    </>);
}

export default Profile;