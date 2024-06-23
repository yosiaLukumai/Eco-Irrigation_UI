
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import IconTextField from './iconTextField';
import Configuration from '../App/config';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaidIcon from '@mui/icons-material/Paid';
import MainAppStore from '../stores/app';
import PowerIcon from '@mui/icons-material/Power';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const AddNewPackage = ({ openFlag = true, notifyParent}) => {
    const [open, setOpen] = useState(openFlag);
    const [power, setPower] = useState(0)
    const [InitialAmount, setInitialAmount] = useState(0)
    const [perDay, setPerDay] = useState(0)
    const [name, setName] = useState("")
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)


    const handleClose = () => {
        setOpen(false);
        notifyParent()
    };

    const addMeterFunc = async () => {
        if (InitialAmount > 0 && perDay > 0 && power > 0 && name.trim().length > 0) {
            try {
                setBackDropON()
                let dataToSend = {
                    initialamount: Number(InitialAmount),
                    powersize: Number(power),
                    amountperday: Number(perDay),
                    name: name.trim()
                }
                const sent = await fetch(`${Configuration.backendUrl}/company/add/package`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                setBackDropOFF()
                const response = await sent.json()
                if (response?.Success) {
                    setNotificationOn("success", " saved the package.")
                    handleClose()
                } else {
                    setNotificationOn("error", response?.Error)
                }
            } catch (error) {
                setNotificationOn("error", "something went wrong.")
            }

        } else {
            setNotificationOn("error", "Fill all the fields")

        }
    }

    useEffect(() => {
        setOpen(openFlag)
    }, [openFlag])



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
                <Box className='' sx={{ padding: { xs: "0.2rem", md: "2.4rem 1.4rem" }, }}>
                    <DialogTitle sx={{ fontSize: "1.9rem", fontWeight: "420" }}>
                        <span style={{ color: '#1d3558' }}>Add</span>
                        <span style={{ color: '#fb8500', paddingLeft: "0.3rem" }}>Package</span>
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
                        <Grid sx={{ minWidth: { md: "25rem", xs: "13rem" } }} container spacing={3}>

                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Name"  validationRules={['req']} updateValue={setName} iconEnd={<WorkspacePremiumIcon />} helperText='e.g Smaller Kit' />
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Initial Amount" type="number" validationRules={['req']} updateValue={setInitialAmount} iconEnd={<AccountBalanceWalletIcon />} helperText='Q  e.g 3M cubic' />
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Amount per Day" type="number" validationRules={['req']} updateValue={setPerDay} iconEnd={<PaidIcon />} helperText='e.g Tsh-2000' />
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Power" type="number" validationRules={['req']} updateValue={setPower} iconEnd={<PowerIcon />} helperText='e.g 240W' />
                            </Grid>
                            <Grid md={12} xs={12} sx={{ mt: "1.4rem", m: "0 auto" }} item>
                                <Button variant='contained' className='hoveredButton border' sx={{ width: "100%", textTransform: "none", padding: "0.3rem 0.7rem", fontSize: "1.1rem", fontWeight: "bold" }} onClick={() => addMeterFunc()}>
                                    ADD
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Box>

            </Dialog>
        </>
    );
}

export default AddNewPackage