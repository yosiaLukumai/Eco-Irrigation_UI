import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Email } from "@mui/icons-material";
import Name from '@mui/icons-material/AccountCircle';
import Station from '@mui/icons-material/AssuredWorkload';
import IconTextField from './iconTextField';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewUser = ({ openFlag = true, notifyParent }) => {
    const [open, setOpen] = useState(openFlag);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [station, setStation] = useState("")
    const [email, setEmail] = useState("")

    const handleClose = () => {
        setOpen(false);
        notifyParent()
    };

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
                sx={{ borderRadius: "17px", padding: { xs: 0, md: "1.3rem" } }}
            >

                <Box sx={{ padding: { xs: "0.2rem", md: "2.4rem 1.4rem" }, }}>
                    <DialogTitle sx={{ fontSize: "1.9rem", fontWeight: "420" }}>
                        <span style={{ color: '#1d3558' }}>Add</span>
                        <span style={{ color: '#419bda', paddingLeft: "0.3rem" }}>New User</span>
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
                        <Grid container spacing={2}>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth validationRules={['req']} updateValue={setFirstName} label="First Name" iconEnd={<Name />} ></IconTextField>
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Last Name" validationRules={['req']} updateValue={setLastName} iconEnd={<Name />} ></IconTextField>
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Station Name" validationRules={['req']} updateValue={setStation} iconEnd={<Station />} ></IconTextField>
                            </Grid>
                            <Grid md={6} xs={12} item>
                                <IconTextField fullWidth label="Email" validationRules={['req', 'email']} updateValue={setEmail} iconEnd={<Email />} ></IconTextField>
                            </Grid>

                            <Grid md={12}  xs={12} sx={{mt:"1.4rem", m:"0 auto"}} item>
                                <Button variant='contained' className='hoveredButton border' sx={{ width: "100%", textTransform: "none", padding: "0.3rem 0.7rem", fontSize: "1.1rem", fontWeight: "bold" }} onClick={() => handleClose()}>
                                    ADD
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions sx={{ display: "flex", px: "1.6rem", pt: "1.1rem", justifyContent: "flex-start" }}>
                        <Button variant='contained' className='hoveredButton border' sx={{ width: "50%", textTransform: "none", padding: "0.3rem 0.7rem", fontSize: "1.1rem", fontWeight: "bold" }} onClick={() => handleClose()}>
                            ADD
                        </Button>

                    </DialogActions> */}
                </Box>

            </Dialog>
        </>

    );
}

export default AddNewUser