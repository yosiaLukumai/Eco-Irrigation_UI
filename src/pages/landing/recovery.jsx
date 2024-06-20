import { Box, Typography, Grid, Button } from "@mui/material";
import IconTextField from "../../components/iconTextField";
import { Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertDialog from "../../Utils/Alerts";
import Configuration from "../../App/config";
import CustomDropDown from "../../components/DropDown";
const Recovery = () => {
    const [email, setEmail] = useState("")
    const [showFlag, setShowFlag] = useState(false)
    const [message, setMessage] = useState("")
    const [typeMessage, SetTypeMessage] = useState("")
    const [type, setType] = useState("")
    const navigator = useNavigate()
    const navigateTo = (path) => {
        navigator(path)
    }

    const options = ["user", "client"]

    const recoverAccount = async () => {
        if (email.trim() != "" && type !="") {
            try {

                let result = await fetch(`${Configuration.backendUrl}/user/recover`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email.trim(), type })
                })

                const response = await result.json()
                if (response?.Success) {
                    SetTypeMessage("success")
                    setMessage(" Reset Email sent check your email Box")
                    setShowFlag(true)

                } else {
                    SetTypeMessage("error")
                    setMessage(response?.Error)
                    setShowFlag(true)
                }

            } catch (error) {
                SetTypeMessage("error")
                setMessage("Something went wrong re-try")
                setShowFlag(true)
            }
        } else {
            SetTypeMessage("error")
            setMessage("Please fill all of the field..")
            setShowFlag(true)
        }
    }

    const NotifyParent = () => {
        setShowFlag(false)
    }

    return (<>

        <Box pt={{ xs: 2, md: 6 }} textAlign={"center"} sx={{ minHeight: "60vh", mt: "2.3rem" }}>
            <Typography sx={{ fontSize: { xs: "1rem", md: "1rem", color: "#1d3557", fontWeight: "450" } }}>
                Having trouble login try recoverying account
            </Typography>
            <AlertDialog msg={message} type={typeMessage} show={showFlag} NotifyParent={NotifyParent} />
            <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
                <Grid container alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 4 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "53%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth validationRules={["req", "email"]} updateValue={setEmail} label="Email" iconEnd={<Email />} ></IconTextField>
                    </Grid>
                 

                    <Grid alignSelf={"center"} display={"flex"} md={7} xs={12} item>
                        <Button onClick={() => recoverAccount()} sx={{
                            padding: "0.4rem 5rem", width: "100%", '&:hover': {
                                background: "#606c38",
                            }, textTransform: "none", fontSize: "1.2rem"
                        }} variant="contained" > Recovery</Button>
                    </Grid>

                    <Grid display={"flex"} justifyContent={"center"} md={7} xs={12} item>
                        <Typography textAlign={"center"} variant="subtitle" onClick={() => navigateTo("/")}>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "400" }} >Or <br /></span>
                            <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "430" }} >Login Here</span>
                        </Typography>


                    </Grid>

                </Grid>



            </Box>


        </Box>
    </>);
}

export default Recovery;