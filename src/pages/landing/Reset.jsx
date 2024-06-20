import { Box, Typography, Grid, Button } from "@mui/material";
import IconTextField from "../../components/iconTextField";
import Password from '@mui/icons-material/Password';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AlertDialog from "../../Utils/Alerts";
import Configuration from "../../App/config";

const ResetPage = () => {
    const [password, setPassword] = useState("")
    const [showFlag, setShowFlag] = useState(false)
    const [message, setMessage] = useState("")
    const [typeMessage, SetTypeMessage] = useState("")
    const [reTypedPassword, setRetypedPassword] = useState("")
    const { emailKey } = useParams()
    const {type} = useParams()
    const navigator = useNavigate()
    const navigateTo = (path) => {
        navigator(path)
    }

    const NotifyParent = () => {
        setShowFlag(false)
    }

    const verifye = async () => {
        if (password.trim() != "" && reTypedPassword.trim() != "") {
            if (password == reTypedPassword) {
                try {
                    // set the password for the user...
                    // /verify/recover
                    let result = await fetch(`${Configuration.backendUrl}/user/verify/recover`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emailKey,
                            password,
                            type
                        })
                    })

                    const response = await result.json();
                    if (response?.Success) {
                        setShowFlag(true)
                        SetTypeMessage("success")
                        setMessage("Well set you can Login")
                    } else {
                        setShowFlag(true)
                        SetTypeMessage("error")
                        setMessage(response?.Error)
                    }

                } catch (error) {
                    setShowFlag(true)
                    SetTypeMessage("error")
                    setMessage("Un expected error has happened.")
                }
            } else {
                SetTypeMessage("error")
                setMessage("Password doesn't match")
                setShowFlag(true)
            }
        } else {
            SetTypeMessage("error")
            setMessage("Please fill all of the field..")
            setShowFlag(true)
        }
    }
    return (<>

        <Box pt={{ xs: 2, md: 6 }} textAlign={"center"}>
            <Typography sx={{ fontSize: { xs: "1rem", md: "1rem", color: "#1d3557", fontWeight: "450" } }}>
                Reset your password
            </Typography>

            <AlertDialog msg={message} type={typeMessage} show={showFlag} NotifyParent={NotifyParent} />

            <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
                <Grid container alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 4 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "53%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Password" type="password" validationRules={['req']} updateValue={setPassword} iconEnd={<Password />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Re-type Password" type="password" validationRules={['req']} updateValue={setRetypedPassword} iconEnd={<Password />} ></IconTextField>
                    </Grid>

                    <Grid alignSelf={"center"} display={"flex"} md={7} xs={12} item>
                        <Button
                            onClick={() => verifye()}
                            sx={{
                                padding: "0.4rem 5rem", width: "100%", '&:hover': {
                                    background: "#606c38",
                                }, textTransform: "none", fontSize: "1.2rem"
                            }} variant="contained" > Save</Button>
                    </Grid>

                    <Grid display={"flex"} justifyContent={"center"} md={7} xs={12} item>
                        <Typography textAlign={"center"} variant="subtitle" onClick={() => navigateTo("/login")}>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "400" }} >Or <br /></span>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "430" }} >Login Here</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>);
}

export default ResetPage;