import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import IconTextField from './iconTextField';
// import AlertDialog from '../Utils/Alerts';
import { retriveData, save } from '../Utils/Localstorage';
import Configuration from '../App/config';
import MainAppStore from '../stores/app';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewBranch = ({ openFlag = true, notifyParent }) => {
    const [open, setOpen] = useState(openFlag);
    const [branchName, setBranchName] = useState("")
    const [branchShortForm, setbranchShortForm] = useState("")
    const setBackDropOFF = MainAppStore((state) => state.setBackDropFlagOff)
    const setBackDropON = MainAppStore((state) => state.setBackDropFlagOn)
    const setNotificationOn = MainAppStore((state) => state.setNotificationOn)


    const handleClose = () => {
        // clear the form
        setOpen(false);
        notifyParent()
    };


    const addRoleFunc = async () => {
        if (branchName.trim() != "" && branchShortForm.length <= 4) {
            try {
                setBackDropON()
                const sent = await fetch(`${Configuration.backendUrl}/company/add/branch`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        companyId: retriveData(Configuration.localStorageKey)?.Company?._id,
                        name: branchName.toUpperCase(),
                        shortform: branchShortForm.toUpperCase()
                    })
                })
                const response = await sent.json()
                setBackDropOFF()
                if (response?.Success) {
                    setNotificationOn("success", " saved the branch.")
                    handleClose()
                } else {
                    setNotificationOn("error", response?.Error)
                }

            } catch (error) {
                setBackDropOFF()
                setNotificationOn("error", " something went wrong.")
            }

        } else {
            setNotificationOn("error", " Ensure all field are filled well")
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
                sx={{ borderRadius: "17px", padding: { xs: 0, md: "1.3rem" } }}
            >



                <Box sx={{ padding: { xs: "0.2rem", md: "2.4rem 1.4rem" }, }}>
                    <DialogTitle sx={{ fontSize: "1.9rem", fontWeight: "420" }}>
                        <span style={{ color: '#1d3558' }}>Add</span>
                        <span style={{ color: '#419bda', paddingLeft: "0.3rem" }}>New Branches</span>
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
                            <Grid md={12} xs={12} item>
                                <IconTextField fullWidth validationRules={['req']} updateValue={setBranchName} helperText="e.g Kinondoni" label="Branch" iconEnd={<WorkspacePremiumIcon />} ></IconTextField>
                            </Grid>
                            <Grid md={12} xs={12} item>
                                <IconTextField fullWidth validationRules={['req']} updateValue={setbranchShortForm} label="Branch short Form e.g Kinondoni KN"></IconTextField>
                            </Grid>
                            <Grid md={12} xs={12} sx={{ mt: "1.4rem", m: "0 auto" }} item>
                                <Button variant='contained' className='hoveredButton border' sx={{ width: "100%", textTransform: "none", padding: "0.3rem 0.7rem", fontSize: "1.1rem", fontWeight: "bold" }} onClick={() => addRoleFunc()}>
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

export default AddNewBranch