import { CardMembership, Money, Phone } from "@mui/icons-material";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconTextField from "../../components/iconTextField";
import Configuration from "../../App/config";
import { save } from "../../Utils/Localstorage";
import MainAppStore from "../../stores/app";



const RechargePage = () => {
    const navigator = useNavigate()
    const [meterID, setMeterID] = useState("")
    const [phone, setPhone] = useState("")
    const [amount, setAmount] = useState("")
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)
    const navigateTo = (path) => {
        navigator(path)
    }

    const rechargeFunc = async () => {
        if (meterID.trim() != "" && amount.trim() != "") {
            setBackDropON()
            try {

             
                setBackDropOFF()
                if (response?.Success) {
                } else {
                    setNotificationOn("error", response?.Error)
                }

            } catch (error) {
                setBackDropOFF()
                setNotificationOn("error", "Something went wrong retry")

            }
        } else {

            setNotificationOn("error", "Please fill all of the field..")
        }
    }


    return (<>
        <Box pt={{ xs: 2, md: 6 }} textAlign={"center"}>
            <Typography sx={{ fontSize: { xs: "1.1rem", md: "1.2rem", color: "#1d3557", fontWeight: "450" } }}>
                Have a Meter ?
            </Typography>
            <Typography sx={{ fontSize: { xs: "1.7rem", md: "2rem", color: "#419bda", fontWeight: "450" } }}>
                Recharge
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
                <Grid container alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 4 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "53%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth validationRules={["req"]} updateValue={setMeterID} label="Meter ID" iconEnd={<CardMembership />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Amount" type="number" validationRules={['req']} updateValue={setAmount} iconEnd={<Money />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Phone" validationRules={['req', 'phone']} updateValue={setPhone} iconEnd={<Phone />} ></IconTextField>
                    </Grid>


                    <Grid alignSelf={"center"} display={"flex"} md={7} xs={12} item>
                        <Button onClick={() => rechargeFunc()} sx={{
                            padding: "0.4rem 5rem", width: "100%", '&:hover': {
                                background: "#606c38",
                            }, textTransform: "none", fontSize: "1.2rem"
                        }} variant="contained" > Recharge</Button>
                    </Grid>

                    <Grid display={"flex"} justifyContent={"space-between"} md={7} xs={12} item>
                        <Typography variant="subtitle" onClick={() => navigateTo("/")}>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "400" }}>Login here</span>
                        </Typography>

                   
                    </Grid>

                </Grid>
            </Box>
        </Box>
    </>);
}

export default RechargePage;



