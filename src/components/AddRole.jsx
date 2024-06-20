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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import IconTextField from './iconTextField';
import RolesTable from './RoleSelector';
import AlertDialog from '../Utils/Alerts';
import { retriveData, save } from '../Utils/Localstorage';
import Configuration from '../App/config';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewRole = ({ openFlag = true, notifyParent }) => {
    const [open, setOpen] = useState(openFlag);
    const [selection, setSelection] = useState(null)
    const [roleDes, setRoleDesc] = useState("")
    const [roleName, setRoleName] = useState("")
    const [showFlag, setShowFlag] = useState(false)
    const [message, setMessage] = useState("")
    const [typeMessage, SetTypeMessage] = useState("")
    let allRole = ['READ', 'CREATE', 'DELETE', 'UPDATE']

    // default selection of the role 
    let defactoRole = ['READ']


    const handleClose = () => {
        setOpen(false);
        notifyParent()
    };
    const NotifyParent = () => {
        setShowFlag(false)
    }

    const addRoleFunc = async () => {
        if (roleName.trim() != "") {

            try {
                let rolesTosend;
                if (selection?.length == 4) {
                    rolesTosend = ['*']
                } else if (selection?.length == 0) {
                    rolesTosend = ['READ']
                } else {
                    rolesTosend = selection
                }

                const sent = await fetch(`${Configuration.backendUrl}/company/add/role`, {
                    method:"POST",
                    mode: "cors",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        companyId: retriveData(Configuration.localStorageKey)?.Company?._id,
                        name: roleName.toUpperCase(),
                        desc: roleDes,
                        roles: rolesTosend
                    })
                })

                const response = await sent.json()
                if(response?.Success) {
                    SetTypeMessage("success")
                    setMessage(" saved the role.")
                    setShowFlag(true)
                }else {
                    SetTypeMessage("error")
                    setMessage(response.Error)
                    setShowFlag(true)
                }
 
            } catch (error) {
                SetTypeMessage("error")
                setMessage(" something went wrong.")
                setShowFlag(true)
            }

        } else {
            SetTypeMessage("error")
            setMessage("At least fill Name of the role")
            setShowFlag(true)
        }


    }

    useEffect(() => {
        setOpen(openFlag)
    }, [openFlag])


    const dataFromSelectio = (data) => {
        let s = allRole.filter((v, i) => {
            if (data[i]) {
                return v
            }
        })
        setSelection(s)
    }
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

                <AlertDialog msg={message} type={typeMessage} show={showFlag} NotifyParent={NotifyParent} />

                <Box sx={{ padding: { xs: "0.2rem", md: "2.4rem 1.4rem" }, }}>
                    <DialogTitle sx={{ fontSize: "1.9rem", fontWeight: "420" }}>
                        <span style={{ color: '#1d3558' }}>Add</span>
                        <span style={{ color: '#419bda', paddingLeft: "0.3rem" }}>New Role</span>
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
                                <IconTextField fullWidth validationRules={['req']} updateValue={setRoleName} helperText="e.g Sales person" label="Role Name" iconEnd={<WorkspacePremiumIcon />} ></IconTextField>
                            </Grid>
                            {/* <Grid md={6} xs={12} item>
                                <InputMultiline placeholder='Set role Description' setValue={setRoleDesc} />
                            </Grid> */}
                            <Grid md={12} xs={12} item>
                                <IconTextField fullWidth validationRules={['req']} updateValue={setRoleName} label="Role Description" multiline
                                    maxRows={4} ></IconTextField>
                            </Grid>
                            <Grid md={12} xs={12} item>
                                <RolesTable passDataParent={dataFromSelectio} />
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

export default AddNewRole