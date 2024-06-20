import { Grid, Button, Box, Avatar, Typography, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddNewUser from "../../components/AddNewUser";
import { useEffect, useRef, useState } from "react";
import AddNewBranch from "../../components/AddBranch";
import { retriveData } from "../../Utils/Localstorage";
import List from '@mui/material/List';
import PhoneIcon from '@mui/icons-material/Phone';
import ListItemm from "../../components/ListItem";
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListItemEditable from "../../components/LIstItemEditable";
import Configuration from "../../App/config";


const Company = () => {
    const [user, setUser] = useState(retriveData("AFM_tecv1"))
    const [loading, setLoading] = useState(true)
    const [companyBranches, setCompanyBranches] = useState(null)
    const [open, setOpen] = useState(false)
    const [openRole, setOpenRole] = useState(false)
    const [thereData, setThereData] = useState(false)
    const [reload, setReload] = useState(false)
    const userId = retriveData(Configuration.localStorageKey)?.Company?._id
    const openNewUserDialog = (id) => {
        if (id == 1) {
            setOpenRole(true)
            return
        }
        setOpen(true)
    }


    // fetching the company Roles (Sites)
    useEffect(() => {
        try {

        } catch (error) {

        }
    }, [])

    useEffect(() => {


        async function fetchData() {
            try {
                const response = await fetch(`${Configuration.backendUrl}/company/find/branch/${userId}`, {
                    mode: "cors",
                    method: "GET"
                })
                const result = await response.json()
                if (result?.Success) {
                    setCompanyBranches(result?.Data)
                    console.log(result?.Data);
                    setThereData(false)
                    setLoading(false)

                } else {
                    setThereData(true)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
                setLoading(true)
            }
        }

        fetchData()

    }, [reload])

    const nowClose = () => {
        setOpen(false)
        setOpenRole(false)
        // Reload 
        setReload(!reload)
    }
    return (<>

        <AddNewUser openFlag={open} notifyParent={nowClose} />
        {openRole &&  <AddNewBranch openFlag={openRole} notifyParent={nowClose} />}
        <Box sx={{ pt: { xs: "2.3rem", md: "2.5rem" }, px: { md: "3rem", xs: "0.2rem" }, height: { md: "92.5vh", xs: "" } }}>
            <Grid container sx={{ background: "", pb: "1.3rem", borderRadius: "1.4rem" }}>
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }} md={12} xs={12} item>
                    <Button onClick={() => openNewUserDialog(1)} variant="contained" sx={{ textTransform: "none", padding: "0.5rem 1.2rem", fontWeight: "bold", borderRadius: "1.2rem" }} className="hoveredButton">
                        <Add sx={{ pr: "0.3rem" }} />
                        Add Branch
                    </Button>
                    <Button onClick={() => openNewUserDialog(2)} variant="contained" sx={{ ml: "0.7rem", textTransform: "none", padding: "0.5rem 1.2rem", fontWeight: "bold", borderRadius: "1.2rem" }} className="hoveredButton">
                        <Add sx={{ pr: "0.3rem" }} />
                        Add Job Title
                    </Button>

                </Grid>
            </Grid>
            {
                (!loading && !thereData) && <Grid container spacing={2}>
                    <Grid className="" xs={12} md={6} item >
                        <Box sx={{ boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", background: "white", borderRadius: "1.4rem", p: "1rem 0.4rem" }}>
                            <Grid container py={4}>
                                <Grid md={12} xs={12} item>
                                    <Typography variant="h5" sx={{ pt: "1.1rem", textAlign: "center" }}>
                                        <span style={{ color: "#1d3558", fontWeight: "1000" }}> Company Branches</span>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} direction={"row"}>

                                <Grid item md={12} xs={12} >
                                    <List sx={{ width: '100%', fontSize: "1.3rem" }}>
                                        {
                                            companyBranches?.map((el, ind) => (
                                                <ListItemEditable shortForm={el?.shortForm} key={ind} Property={el?.name} />
                                            ))
                                        }
                                    </List>
                                </Grid>

                            </Grid>

                        </Box >

                    </Grid>
                    <Grid className="" item xs={12} md={6} >
                        <Box sx={{ boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", background: "white", borderRadius: "1.4rem", p: "1rem 0.4rem" }}>
                            <Grid container py={4}>
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
                    </Grid>
                </Grid>
            }
            {
                (!loading && thereData) && <Grid className="" xs={12} md={12} item >
                    <Typography variant="h6" sx={{ color: "#1d3557" }}>
                        There is no Branches Details
                    </Typography>

                </Grid>
            }
            {
                loading && <Box className="" sx={{ display: "flex", minHeight: "19rem", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress />
                    <Typography variant="h6" pt="0.3rem" sx={{ color: "#1d3557" }}>
                        Processing...
                    </Typography>

                </Box>
            }

        </Box>

    </>);
}

export default Company;