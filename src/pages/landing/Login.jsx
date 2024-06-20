import { Email } from "@mui/icons-material";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Password from '@mui/icons-material/Password';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconTextField from "../../components/iconTextField";
import Configuration from "../../App/config";
import { save } from "../../Utils/Localstorage";
import MainAppStore from "../../stores/app";



const LoginPage = () => {
    const navigator = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)
    const navigateTo = (path) => {
        navigator(path)
    }

    const loginFunc = async () => {
        if (email.trim() != "" && password.trim() != "") {
            setBackDropON()
            try {

                const loginData = {
                    email: email.trim(),
                    password: password.trim()
                }

                let result = await fetch(`${Configuration.backendUrl}/user/signIn`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                let response = await result.json()
                setBackDropOFF()
                if (response?.Success) {
                    // obtain the data set to localstorage and push the user to the dashboard..
                    save(Configuration.localStorageKey, response?.Data)
                    // push to the dashboard
                    navigateTo(`/auth/comp/${response?.Data?._id}`)
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
        <Box pt={{ xs: 3, md: 6 }} textAlign={"center"}>
            <Typography sx={{ fontSize: { xs: "1.1rem", md: "1.2rem", color: "#1d3557", fontWeight: "450" } }}>
                Have an account ?
            </Typography>
            <Typography color={"primary"} sx={{ fontSize: { xs: "1.7rem", md: "2rem", fontWeight: "450" } }}>
                Login
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
                <Grid container alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 4 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "53%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth validationRules={["req", "email"]} updateValue={setEmail} label="Email" iconEnd={<Email />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Password" type="password" validationRules={['req']} updateValue={setPassword} iconEnd={<Password />} ></IconTextField>
                    </Grid>


                    <Grid alignSelf={"center"} display={"flex"} md={7} xs={12} item>
                        <Button onClick={() => loginFunc()} sx={{
                            padding: "0.4rem 5rem", width: "100%", '&:hover': {
                                background: "#606c38",
                            }, textTransform: "none", fontSize: "1.2rem"
                        }} variant="contained" > Login</Button>
                    </Grid>

                    <Grid display={"flex"} justifyContent={"space-between"} md={7} xs={12} item>
                        <Typography variant="subtitle" onClick={() => navigateTo("/register")}>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "400" }}>Register Here</span>
                        </Typography>

                        <Typography variant="subtitle" onClick={() => navigateTo("/recovery")}>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "400" }}>Forgot Password ?</span>
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    </>);
}

export default LoginPage;



