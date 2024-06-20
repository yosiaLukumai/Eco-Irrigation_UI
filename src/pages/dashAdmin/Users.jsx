import { Grid, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddNewUser from "../../components/AddNewUser";
import { useState } from "react";
import AddNewRole from "../../components/AddRole";
const User = () => {
    const [open, setOpen] = useState(false)
    const [openRole, setOpenRole] = useState(false)
    const openNewUserDialog = (id) => {
        if (id == 1) {
            setOpenRole(true)
            return
        }
        setOpen(true)
    }

    const nowClose = () => {
        setOpen(false)
        setOpenRole(false)
    }
    return (<>

        <AddNewUser openFlag={open} notifyParent={nowClose} />
        <AddNewRole openFlag={openRole} notifyParent={nowClose} />
        <Box sx={{ pt: { xs: "2.3rem", md: "2.5rem" }, px: { md: "3rem", xs: "0.2rem" }, height: { md: "92.5vh", xs: "" } }}>
            <Grid container sx={{ background: "", py: "", borderRadius: "" }}>
                <Grid sx={{ display: "flex", justifyContent: "flex-end", px: { xs: "0.4rem", md: "1.4rem" }, pt: "1.2rem" }} md={12} xs={12} item>
                    <Button onClick={() => openNewUserDialog(1)} variant="contained" sx={{ textTransform: "none", padding: "0.5rem 1.2rem", fontWeight: "bold", borderRadius: "1.2rem" }} className="hoveredButton">
                        <Add sx={{ pr: "0.3rem" }} />
                        Add Role
                    </Button>
                    <Button onClick={() => openNewUserDialog(2)} variant="contained" sx={{ ml: "0.7rem", textTransform: "none", padding: "0.5rem 1.2rem", fontWeight: "bolder", borderRadius: "1.2rem" }} className="hoveredButton">
                        <Add sx={{ pr: "0.3rem" }} />
                        Add User
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </>);
}

export default User;