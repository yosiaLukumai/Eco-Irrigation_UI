
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import IconTextField from './iconTextField';
import AlertDialog from '../Utils/Alerts';
import { retriveData } from '../Utils/Localstorage';
import Configuration from '../App/config';
import CustomDropDown from './DropDown';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { VerifyPhoneNumber, verifyEmail } from '../Utils/validation';
import BackdropProcess from './Backdrop';
import MainAppStore from '../stores/app';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide timeout={20} direction="left" ref={ref} {...props} />;
});
const AddNewClient = ({ openFlag = true, notifyParent, valu, valID, pumpIDs }) => {
    const [open, setOpen] = useState(openFlag);
    const [showFlag, setShowFlag] = useState(false)
    const [meterSerial, setmeterSerial] = useState(null)
    const [message, setMessage] = useState("")
    const [typeMessage, SetTypeMessage] = useState("")
    const [email, setemail] = useState("")
    const [firstName, setfirstName] = useState("")
    const [meter, setmeter] = useState("")
    const [lastName, setlastName] = useState("")
    const [phone, setPhone] = useState('')
    const [NIN, setNIN] = useState("")
    const [brach, setBranch] = useState("")
    const [thereisAvailableMeter, setthereisAvailableMeter] = useState(false)
    const [fetchingMeter, setFetchingMeter] = useState(false)
    const [onSending, setonSending] = useState(false)
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)

    const handleClose = () => {
        setOpen(false);
        notifyParent()
    };
    const NotifyParent = () => {
        setShowFlag(false)
    }
    const addClient = async () => {
        if (firstName.trim() != "" && lastName.trim() != ""  && email.trim() != "" && phone.trim() != "" && !(phone.trim().length != 10 || !VerifyPhoneNumber(phone.trim())) && !(!VerifyPhoneNumber(NIN.trim())) && !(!verifyEmail(email.trim()))) {
            // setonSending(true)
            setBackDropON()
            try {
                let dataToSend = {
                    email: email.trim(),
                    firstname: firstName.trim(),
                    lastname: lastName.trim(),
                    phone: phone.trim(),
                    kit : brach
                }
                console.log(dataToSend);
                const sent = await fetch(`${Configuration.backendUrl}/client/register`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                const response = await sent.json()
                console.log(response);
                if (response?.Success) {
                    // setonSending(false)
                    setBackDropOFF()
                    SetTypeMessage("success")
                    setMessage(" saved the Customer.")
                    setShowFlag(true)
                } else {
                    // setonSending(false)
                    setBackDropOFF()
                    console.log("backend error:  ", response);
                    SetTypeMessage("error")
                    setMessage(response?.Error)
                    setShowFlag(true)
                }


            } catch (error) {
                // setonSending(false)
                setBackDropOFF()
                SetTypeMessage("error")
                setMessage(" something went wrong.")
                setShowFlag(true)
            }


        } else {
            SetTypeMessage("error")
            if (phone.trim().length != 10 || !VerifyPhoneNumber(phone.trim())) {
                setMessage(" Ensure the phone number is correct..")
            } else if (!verifyEmail(email.trim())) {
                setMessage(" Incorrect Email")
            } else {
                setMessage("Fill all the required field")
            }
            setShowFlag(true)
        }
    }

    useEffect(() => {
        setOpen(openFlag)
    }, [openFlag])

    useEffect(() => {
        setMessage("")
        // async function FetchUnAssigneMeter() {
        //     try {
        //         let dataToSend = {
        //             branchID: brach
        //         }
        //         const sent = await fetch(`${Configuration.backendUrl}/company/find/unassignedMeter`, {
        //             method: "POST",
        //             mode: "cors",
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(dataToSend)
        //         })
        //         const response = await sent.json()
        //         if (response?.Success) {
        //             if (response?.Data?.data?.length >= 1) {
        //                 setthereisAvailableMeter(true)
        //                 setFetchingMeter(false)
        //                 let serialNumbers = response?.Data?.data?.map((v, i) => v?.serialno)
        //                 let meterIDS = response?.Data?.data?.map((v, i) => v?._id)
        //                 setmeterIDs(meterIDS)
        //                 setmeterSerial(serialNumbers)
        //             } else {
        //                 setMessage("There is no meters Create first")
        //                 setthereisAvailableMeter(false)

        //             }
        //         } else {
        //             setMessage("Backend error")
        //         }
        //     } catch (error) {
        //         setMessage(error?.message)
        //     }

        // }
        if (brach != "") {
            // setFetchingMeter(true)
            setthereisAvailableMeter(true)
        }
        else {
            // setFetchingMeter(false)
            setthereisAvailableMeter(false)
        }
    }, [brach])



    return (
        <>
            <Dialog
                open={open}
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose()}
                aria-describedby="alert-dialog-slide-description"
                sx={{ borderRadius: "17px", padding: { xs: 0, md: "2.3rem" } }}
            >
                {/* <BackdropProcess opens={onSending}/> */}
                <AlertDialog time={1500} msg={message} type={typeMessage} show={showFlag} NotifyParent={NotifyParent} />
                <Box className='' sx={{ padding: { xs: "0.2rem", md: "2.4rem 1.4rem" }, }}>
                    <DialogTitle sx={{ fontSize: "1.9rem", fontWeight: "420" }}>
                        <span style={{ color: '#1d3558' }}>Add</span>
                        <span style={{ color: '#fb8500', paddingLeft: "0.3rem" }}>New Client</span>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: { xs: 19, md: 29 },
                        }}
                    >
                        <CloseIcon fontSize='large' fontWeight={"bold"} sx={{ color: "#1d3558" }} />
                    </IconButton>
                    <DialogContent>
                        <Grid>
                            <Grid sx={{ minWidth: { md: "25rem", xs: "15rem" } }} md={12} xs={12} item container spacing={0}>
                                <CustomDropDown placeholder='Kit' setValue={setBranch} valseen={pumpIDs} vals={pumpIDs} helperText='Select Kit' />
                            </Grid>
                        </Grid>
                        {
                            thereisAvailableMeter && <Grid sx={{ minWidth: { md: "25rem", xs: "13rem" } }} container spacing={2}>
                                <Grid md={6} xs={12} item>
                                    <IconTextField fullWidth label="First Name" helperText='e.g John' validationRules={['req']} updateValue={setfirstName} iconEnd={<PersonIcon />} />
                                </Grid>
                                <Grid md={6} xs={12} item>
                                    <IconTextField fullWidth label="Last Name" helperText='e.g Masaki' validationRules={['req']} updateValue={setlastName} iconEnd={<PersonIcon />} />
                                </Grid>
                                <Grid md={6} xs={12} item>
                                    <IconTextField fullWidth label="Email" validationRules={['req', "email"]} updateValue={setemail} iconEnd={<MailOutlineIcon />} helperText='e.g user@gmail.com' />
                                </Grid>
                             
                                <Grid md={6} xs={12} item>
                                    <IconTextField fullWidth label="Phone" validationRules={['req', "phone"]} updateValue={setPhone} iconEnd={<PhoneIcon />} helperText='e.g 0762127425' />
                                </Grid>
                                <Grid md={12} xs={12} sx={{ mt: "1.4rem", m: "0 auto" }} item>
                                    <Button disabled={onSending} variant='contained' className='hoveredButton border' sx={{ width: "100%", textTransform: "none", padding: "0.3rem 0.7rem", fontSize: "1.1rem", fontWeight: "bold" }} onClick={() => addClient()}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        {
                            (!thereisAvailableMeter && !fetchingMeter) && <Typography textAlign={"center"} variant='h6'> First select the Kit</Typography>
                        }
                        {
                            (!thereisAvailableMeter && message != "") && <Typography textAlign={"center"} variant='h6'> {message}</Typography>
                        }
                        {
                            (fetchingMeter && message == "") && <Box sx={{ pt: "1.2rem", width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        }
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}

export default AddNewClient;