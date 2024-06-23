// import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import Configuration from "../../App/config";

// const Verification = () => {
//     const [loading, setloading] = useState(true)
//     const isMounted = useRef(false);
//     const [verified, setVerfied] = useState(false)
//     const [message, setMessage] = useState("")

//     const { emailKey } = useParams()
//     const navigator = useNavigate()
//     const navigateTo = (path) => {
//         navigator(path)
//     }

//     useEffect(() => {

//         if (!isMounted.current) {
//             isMounted.current = true;
//             async function verifiyAdmin() {
//                 const result = await fetch(`${Configuration.backendUrl}/user/verify/admin/${emailKey}`);
//                 const response = await result.json()
//                 if (response?.Success) {
//                     setloading(false)
//                     setVerfied(true)
//                     setMessage(response?.Error)
//                 } else {
//                     setloading(false)
//                     setVerfied(false)
//                     setMessage(response?.Error)
//                 }
//             }
//             try {
//                 verifiyAdmin()
//             } catch (error) {
//                 setloading(false)
//                 setVerfied(false)
//             }
//         }

//     }, [])

//     const MessageBox = () => {
//             {verified ? 'Verified...' : {message}}
//     }


//     return (<>

//         <Box pt={{ xs: 2, md: 6, }} sx={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center", }} textAlign={"center"}>
//             {
//                 loading ? <Box>
//                     <CircularProgress />
//                     <Typography variant="h6" pt="0.3rem" sx={{ color: "#1d3557" }}>
//                         Processing...
//                     </Typography>

//                 </Box> :
//                     <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", width:"100%", alignItems: "center" }}>
//                         <Grid container  className="" alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 5 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "100%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
//                             <Grid sx={{width:"100%"}} display={"flex"} justifyContent={"center"} md={7} xs={12} item>
//                                 <Typography textAlign={"center"} sx={{width:"100%"}} variant="h6">
//                                     <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "430" }} >  {   verified ? 'Verified...' : message} </span>
//                                 </Typography>
//                             </Grid>
//                             <Grid display={"flex"} justifyContent={"center"} md={12} xs={12} item>
//                                 <Button variant="outlined">
//                                     <Typography textAlign={"center"} variant="subtitle" onClick={() => navigateTo("/")}>
//                                         <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "430" }} >Login Here</span>
//                                     </Typography>
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </Box>
//             }


//         </Box>
//     </>);
// }

// export default Verification;



import { Box, Typography, Grid, Button } from "@mui/material";
import IconTextField from "../../components/iconTextField";
import Password from '@mui/icons-material/Password';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AlertDialog from "../../Utils/Alerts";
import Configuration from "../../App/config";
import MainAppStore from "../../stores/app";

const ResetPageFarmer = () => {
    const [password, setPassword] = useState("")
    const [showFlag, setShowFlag] = useState(false)
    const [message, setMessage] = useState("")
    const [typeMessage, SetTypeMessage] = useState("")
    const [reTypedPassword, setRetypedPassword] = useState("")
    const { emailKey } = useParams()
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)

    const navigator = useNavigate()
    const navigateTo = (path) => {
        navigator(path)
    }

    const NotifyParent = () => {
        setShowFlag(false)
    }

    const verifye = async () => {
        if (password.trim() != "" && reTypedPassword.trim() != "" && password.trim().length > 7 && reTypedPassword.trim().length > 7) {
            if (password == reTypedPassword) {
                console.log(password, reTypedPassword);
                try {
                    // set the password for the user...
                    // /verify/recover
                    let result = await fetch(`${Configuration.backendUrl}/user/verify/email`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emailKey,
                            password,
                        })
                    })

                    const response = await result.json();
                    if (response?.Success) {
                        setNotificationOn("success", "Login on mobile app")
                    } else {
                        setNotificationOn("error", response?.Error)
                    }
                } catch (error) {
                    setNotificationOn("error", "Un expected error has happened.")
                }
            } else {

                setNotificationOn("error", "Password doesn't match")
            }
        } else {
            console.log(password.trim().length, reTypedPassword.trim().length);
            if (password.trim().length <= 7 || reTypedPassword.trim().length <= 7) {
                setNotificationOn("error", "Password should be long.")
                return
            }
            setNotificationOn("error", "Please fill all of the field..")
        }
    }
    return (
        <>
            <Box pt={{ xs: 2, md: 6 }} textAlign={"center"}>
                <Typography sx={{ fontSize: { xs: "1rem", md: "1rem", color: "#1d3557", fontWeight: "450" } }}>
                    Weel set your password
                </Typography>


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

export default ResetPageFarmer;