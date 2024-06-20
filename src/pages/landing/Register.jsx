import { Email } from "@mui/icons-material";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Company from '@mui/icons-material/Business';
import Location from '@mui/icons-material/PushPin';
import Phone from '@mui/icons-material/LocalPhone';
import Password from '@mui/icons-material/Password';
import Name from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import IconTextField from "../../components/iconTextField";
import Configuration from "../../App/config";
import MainAppStore from "../../stores/app";

const Register = () => {

  // params and useState funcs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
  const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
  const setNotificationOn = MainAppStore((state) => state.setNotificationOn)

  const registerCompany = async () => {
    if (email.trim() != "" && password.trim() != "" && location.trim() != "" && firstName.trim() != "" && lastName.trim() != "" && phone.trim() != "" && password.trim().length > 7) {
      // signupdata 
      setBackDropON()
      let signUpData = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          password: password
      }

      try {
        let result = await fetch(`${Configuration.backendUrl}/user/register`, {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signUpData)
        })
        const response = await result.json()
        setBackDropOFF()
        if (response?.Success) {
          setNotificationOn("success", "Succesfull registered login")
          navigateTo("/")
        } else {
          setNotificationOn("error", response?.Error)
        }
      } catch (error) {
        setBackDropOFF()
        setNotificationOn("error", "Un expected error has happened.")
      }
    } else {
      if (password.trim().length < 7) {
        setNotificationOn("error", "Password should be long")
        return
      }
      setNotificationOn("error", "Please fill all of the field..")
    }
  }


  const navigator = useNavigate()
  const navigateTo = (path) => {
    navigator(path)
  }
  return (<>
    <Box pt={{ xs: 2, md: 6 }} textAlign={"center"}>
      <Typography color="primary" sx={{ fontSize: { xs: "1.7rem", md: "2.3rem", fontWeight: "450" } }}>
        Sign-up
      </Typography>



      <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
        <Grid container columnSpacing={{ xs: 0, md: 4 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "53%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>


          <Grid md={6} xs={12} item>
            <IconTextField fullWidth validationRules={['req']} updateValue={setFirstName} label="First Name" iconEnd={<Name />} ></IconTextField>
          </Grid>
          <Grid md={6} xs={12} item>
            <IconTextField fullWidth label="Last Name" validationRules={['req']} updateValue={setLastName} iconEnd={<Name />} ></IconTextField>
          </Grid>


          <Grid md={6} xs={12} item>
            <IconTextField fullWidth validationRules={['req']} updateValue={setLocation} label="Location" iconEnd={<Location />} ></IconTextField>
          </Grid>
          <Grid md={6} xs={12} item>
            <IconTextField fullWidth label="Phone Number" validationRules={['req', "phone"]} updateValue={setPhone} iconEnd={<Phone />} ></IconTextField>
          </Grid>
          <Grid md={6} xs={12} item>
            <IconTextField fullWidth validationRules={["req", "email"]} updateValue={setEmail} label="Email" iconEnd={<Email />} ></IconTextField>
          </Grid>
          <Grid md={6} xs={12} item>
            <IconTextField fullWidth label="Password" type="password" validationRules={['req']} updateValue={setPassword} iconEnd={<Password />} ></IconTextField>
          </Grid>

          <Grid display={"flex"} md={12} xs={12} item>
            <Button sx={{
              padding: "0.4rem 5rem", width: "100%", '&:hover': {
                background: "#606c38",
              },
              textTransform: "none", fontSize: "1.2rem"
            }} onClick={() => registerCompany()} variant="contained" > Register</Button>
          </Grid>




          <Grid display={"flex"} md={12} xs={12} item>
            <Typography variant="subtitle">
              <span style={{ fontWeight: "300" }}>You an Have account? </span>
              <span style={{ color: "#1d3557", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigateTo("/")}> Login here</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>

  </>);
}

export default Register;
