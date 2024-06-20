
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
import HeightIcon from '@mui/icons-material/Height';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import MainAppStore from '../stores/app';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const AddNewMeter = ({ openFlag = true, notifyParent, }) => {
    const [open, setOpen] = useState(openFlag);
    const [discharge, setDischarge] = useState(0)
    const [head, setHead] = useState(0)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)


    const handleClose = () => {
        setOpen(false);
        notifyParent()
    };

    const addMeterFunc = async () => {
        if (discharge > 0 && head > 0) {
            try {
                setBackDropON()
                let dataToSend = {
                    discharge: Number(discharge),
                    head: Number(head),
                }
                const sent = await fetch(`${Configuration.backendUrl}/company/add/system`, {
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
                    setNotificationOn("success", " saved the system.")
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
                        <span style={{ color: '#fb8500', paddingLeft: "0.3rem" }}>Kit</span>
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
                                <IconTextField fullWidth label="Head" type="number" validationRules={['req']} updateValue={setHead} iconEnd={<HeightIcon />} helperText='e.g 15M' />
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Discharge (Q)" type="number" validationRules={['req']} updateValue={setDischarge} iconEnd={<HeatPumpIcon />} helperText='Q  e.g 3M cubic' />
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

export default AddNewMeter