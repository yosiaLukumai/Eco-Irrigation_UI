import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { AppBar, Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import Feature from '@mui/icons-material/GppGood';
import Price from '@mui/icons-material/LocalOffer';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AppBarComponent = () => {


    const [open, setOpen] = useState(false);
    const navigator = useNavigate()

    const navigateTo = (path) => {
        navigator(path)
    }
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const navItems = ['Features', 'Pricing', 'Contact'];

    const scrollPageTo = (item) => {
        scrollToId(item)
    }

    const scrollToId = (id) => {

    }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {navItems.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton >
                            <ListItemIcon>
                                {text === "Features" ? <Feature /> : (text == "Pricing") ? <Price /> : <ContactSupportIcon />}
                            </ListItemIcon>
                            <ListItemText sx={{ fontWeight: "bolder" }} > {text} </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>

                    <Button onClick={() => navigateTo("/")} sx={{
                        fontSize: "1.1rem", '&:hover': {
                            color: "#606c38",
                        }, padding: "0 0", fontWeight: "540", backgroundColor: "none", textTransform: "none"
                    }}>Login</Button>
                </ListItem>
                <ListItem>
                    <Button onClick={() => navigateTo("register")} sx={{
                        fontSize: "1.1rem", padding: "0.3rem 1.3rem", borderRadius: "14px", boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", color: "white", '&:hover': {
                            background: "#386641",
                        }, fontWeight: "540", backgroundColor: "#386641", textTransform: "none"
                    }}>Sign up</Button>
                </ListItem>
            </List>

        </Box>
    );
    return (<>
        <AppBar position="sticky" sx={{ mt: { xs: 0, sm: 0, md: 2 }, background: "white", boxShadow: "none" }} className="">
            <Toolbar className="" variant="dense" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box display={"flex"} alignContent={"center"} alignItems={"center"}>
                    <Typography variant="h5" className="" color="primary" sx={{ fontWeight: "bolder", fontSize: "1.8rem" }} component="div">
                        Eco-Irrigation
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'block' }, ml: { md: 12, xl: 14 }, backgroundColor: "" }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{
                                '&:hover': {
                                    color: "#606c38",
                                }, fontWeight: "540", mx: 0.4, color: '#878691', textTransform: "none", fontSize: "1.1rem"
                            }} onClick={() => scrollPageTo(item)}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button onClick={() => navigateTo("/")} sx={{
                        fontSize: "1.1rem", '&:hover': {
                            color: "#386641",
                        }, padding: "0 0", fontWeight: "540", backgroundColor: "none", textTransform: "none"
                    }}>Login</Button>
                    <Box mx={2}></Box>
                    <Button onClick={() => navigateTo("register")} sx={{
                        fontSize: "1.1rem", padding: "0.3rem 1.3rem", borderRadius: "14px", boxShadow: "0px 18px 38px 5px rgba(0,0,0,0.1)", color: "white", '&:hover': {
                            background: "#606c38",
                        }, fontWeight: "540", backgroundColor: "#386641", textTransform: "none"
                    }}>Sign up</Button>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton edge="start" color="primary" aria-label="menu" sx={{ mr: 0 }} onClick={toggleDrawer(true)}>
                        <MenuIcon color="red" style={{ fontSize: 42 }} />
                    </IconButton>
                </Box>

            </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </>);
}

export default AppBarComponent;