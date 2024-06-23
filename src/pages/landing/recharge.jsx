import { CardMembership, Money, Phone } from "@mui/icons-material";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Await, useNavigate } from "react-router-dom";
import { useState } from "react";
import IconTextField from "../../components/iconTextField";
import Configuration from "../../App/config";
import { retriveData, save } from "../../Utils/Localstorage";
import MainAppStore from "../../stores/app";
import { TimeHasPassed } from "../../Utils/time";
import CustomDropDown from "../../components/DropDown";
import { VerifyPhoneNumber, VerifyPhoneNumberLength } from "../../Utils/validation";



const RechargePage = () => {
    const navigator = useNavigate()
    const [meterID, setMeterID] = useState("")
    const [phone, setPhone] = useState("")
    const [provider, setProvider] = useState("")
    const [amount, setAmount] = useState("")
    const [tokenWasSuccessfulObtained, settokenWasSuccessfulObtained] = useState(false)
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)
    const navigateTo = (path) => {
        navigator(path)
    }

    let APP_NAME = import.meta.env.VITE_APP_NAME
    let APP_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
    let VITE_TOKEN = import.meta.env.VITE_TOKEN
    let VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID
    let apiforToke = "https://authenticator-sandbox.azampay.co.tz/AppRegistration/GenerateToken"
    let checkOutApi = "https://sandbox.azampay.co.tz/azampay/mno/checkout"


    const TokenGeneration = async () => {
        // Generate first token
        if (retriveData("API_keyValue") && TimeHasPassed(new Date().toISOString(), Date(retriveData("ExpirationOfApiKey")))) {
            // no need to generate already exists
            return [true, retriveData("API_keyValue")]
        } else {
            let tokenData = {
                appName: APP_NAME,
                clientSecret: APP_CLIENT_SECRET,
                clientId: VITE_CLIENT_ID
            }
            let TokenResults = await fetch(apiforToke, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tokenData)
            })
            let TokenResult = await TokenResults.json()
            if (TokenResult?.success) {
                save("API_keyValue", TokenResult?.data?.accessToken)
                save("ExpirationOfApiKey", TokenResult?.data?.expire)
                return [true, TokenResult?.data?.accessToken]
            } else {
                return [false, null]
            }
        }
    }


    const CheckOutMNO = async (tokenAuth) => {
        // Generate first token
        let checkouData = {
            accountNumber: phone,
            amount: amount,
            currency: "TZS",
            externalId: "123",
            provider: provider
        }
        let checkoutResults = await fetch(checkOutApi, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bear ${tokenAuth}`
            },
            body: JSON.stringify(checkouData)
        })
        let checkoutResult = await checkoutResults.json()
        if (checkoutResult?.success) {
            return [true, checkoutResult?.transactionId]
        } else {
            return [false, null]
        }
    }

    const SaveSuccesfulTransction = async (transactionId) => {
        let dataToS = {
            phone: phone,
            provider: provider,
            kit: meterID,
            transactionId: transactionId,
            amount: Number(amount)
        }
        let result = await fetch(`${Configuration.backendUrl}/payment/save`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToS)
        })
        const response = await result.json();
        console.log(response);
        if (response?.Success) {
            return [true, ""];
        } else {
            return [false, response?.Error];
        }
    }

    let providerNames = ["Mpesa", "Airtel", "Tigo", "Halopesa", "Azampesa"]

    const rechargeFunc = async () => {
        if (meterID.trim() != "" && amount.trim() != "" && provider != "" && phone.trim() != "" && VerifyPhoneNumber(phone) && VerifyPhoneNumberLength(phone)) {
            setBackDropON()
            try {
                // try to obtain token from the localstorage if not generate and save it into local storage

                let [succF, token] = await TokenGeneration()
                if (succF) {
                    let [succF2, TranID] = await CheckOutMNO(token)
                    if (succF2) {
                        let [succF3, erroM] = await SaveSuccesfulTransction(TranID)
                        if (succF3) {
                            setNotificationOn("success", "saved transaction")
                        } else {
                            setNotificationOn("error", erroM)
                        }
                    } else {
                        setNotificationOn("error", "Failed to save")
                        setBackDropOFF()
                    }
                } else {
                    setNotificationOn("error", "Failed to save")
                    setBackDropOFF()
                }
                setBackDropOFF()

            } catch (error) {
                setBackDropOFF()
                setNotificationOn("error", "Something went wrong retry")

            }
        } else {
            if (!VerifyPhoneNumber(phone) || !VerifyPhoneNumberLength(phone)) {
                setNotificationOn("error", "Phone no Incorrect.")
                return
            }
            setNotificationOn("error", "Please fill all of the field..")
        }
    }


    return (<>
        <Box pt={{ xs: 2, md: 6 }} textAlign={"center"}>
            <Typography sx={{ fontSize: { xs: "1.1rem", md: "1.2rem", color: "#1d3557", fontWeight: "450" } }}>
                You have our system ?
            </Typography>
            <Typography  sx={{ fontSize: { xs: "1.7rem", color:"#fb8500", md: "2rem", fontWeight: "450" } }}>
                Recharge here
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
                <Grid container alignItems="center" justifyContent="center" columnSpacing={{ xs: 0, md: 4 }} rowSpacing={3} sx={{ width: { xs: "90%", sm: "80%", md: "53%" }, pt: { xs: "0.9rem", md: "1.3rem" } }}>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth validationRules={["req"]} updateValue={setMeterID} label="Kit ID" iconEnd={<CardMembership />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Amount" type="number" validationRules={['req']} updateValue={setAmount} iconEnd={<Money />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <IconTextField fullWidth label="Phone" validationRules={['req', 'phone']} updateValue={setPhone} iconEnd={<Phone />} ></IconTextField>
                    </Grid>
                    <Grid md={7} xs={12} item>
                        <CustomDropDown placeholder='Provider' setValue={setProvider} valseen={providerNames} vals={providerNames} helperText='e.g Mpesa' />
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
