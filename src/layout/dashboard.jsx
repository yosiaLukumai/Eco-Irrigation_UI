import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Email } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import BusinessIcon from '@mui/icons-material/Business';
import logo from "/smart-meter1.png"


// Icons for the dashboard 
import Dashboard from '@mui/icons-material/Dashboard';
import Usage from '@mui/icons-material/DataUsage';
import Meter from '@mui/icons-material/GasMeter';
import ManageUsers from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import Users from '@mui/icons-material/Group';
import Profile from '@mui/icons-material/ManageAccounts';
import PaymentIcon from '@mui/icons-material/Paid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { retriveData, save } from '../Utils/Localstorage';
import Configuration from '../App/config';
import { Grid } from '@mui/material';
import BackdropProcess from '../components/Backdrop';
import MainAppStore from '../stores/app';
import AlertDialog from '../Utils/Alerts';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(0)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(12)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({

    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(!open && {
        zIndex: theme.zIndex.drawer + 1,
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DashBoardAdmin = () => {
    const navigator = useNavigate()
    const [open, setOpen] = useState(true);
    const [activeTab, setActiveTab] = useState(retriveData("activeTab")?.activeTab)

    // setting the notification and backdrop process into the higher order
    const onSending = MainAppStore((state) => state.BackDropFlag)
    const msgs = MainAppStore((state) => state.NotificationMessage)
    let typeMessage = MainAppStore((state) => state.NotificationType)
    const showFlag = MainAppStore((state) => state.NotificationFlag)
    const setNotificationOff = MainAppStore((state) => state.setNotificationOff)

    const NotifyParent = () => {
        setNotificationOff()
    }
    const setActiveTabFunc = (tabName) => {
        save("activeTab", { activeTab: tabName })
        setActiveTab(tabName)
        if (tabName == "Logout") {
            save(Configuration.localStorageKey, null)
            navigator("/", { replace: true })
            return
        }
        if (tabName != "Dashboard") {
            navigator(tabName)
        } else {
            navigator("")
        }
    }

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" elevation={1} sx={{ backgroundColor: "white", py: 0.0, }} open={open}>
                <Toolbar sx={{}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            // display:{xs:"block", md:"none"},
                            marginLeft: 1,
                            // ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon fontSize='large' sx={{ color: "#1d3557" }} />
                    </IconButton >
                    <Box className="" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <Box className="inputSearch">
                                <SearchIcon />
                                <Typography sx={{ pl: "1rem", fontWeight: 350, fontSize: "1.2rem", opacity: "0.76" }}>
                                    Search user
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: { xs: "block", md: "none", width: "1.3rem" } }}>

                        </Box>
                        <Box display={'flex'} sx={{ minWidth: "100px", justifyContent: "space-between" }} className="">
                            <Box className="rounded" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "45px", width: "45px" }}>
                                <Email fontSize='large' sx={{ color: "#1d3557" }} />
                            </Box>
                            <Box className="rounded" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "45px", width: "45px" }}>
                                <NotificationsIcon fontSize='large' sx={{ color: "#1d3557" }} />
                            </Box>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer elevation={1} variant="permanent" open={open}>
                {/* <DrawerHeader sx={{ py: 1.3 }}> */}





                {/* </DrawerHeader> */}
                <DrawerHeader sx={{ px: "0.5rem", py: { xs: '0.3rem', md: "1.7rem" } }}>
                    <Grid container justifyContent={"center"} alignContent={"center"}>
                        <Grid item className=''>
                            <Box className="" display={"flex"} sx={{ justifyContent: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Typography variant='h6' sx={{ fontWeight: "600" }}>
                                        <span style={{ color: "#386641" }}>Eco<span style={{color:"#fb8500"}}>-Irrigation</span></span>
                                    </Typography>
                                    {/* <IconButton onClick={handleDrawerClose}>
                                        <ChevronLeftIcon sx={{ color: "#1d3557" }} fontSize='large' fontWeight="bolder" />
                                    </IconButton> */}
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>

                </DrawerHeader>

                <List>
                    {['Dashboard', 'Usage', 'Systems', 'Farmers', 'Payment', 'Users'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}
                            className={activeTab == text ? "activeTabClass" : ''}
                        >
                            <ListItemButton
                                onClick={() => setActiveTabFunc(text)}
                                sx={{
                                    minHeight: 50,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    py: 1.8,

                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        ml: open ? 0 : 2.3,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {text == "Dashboard" ? <Dashboard sx={{ color: activeTab == "Dashboard" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Usage" ? <Usage sx={{ color: activeTab == "Usage" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Systems" ? <SolarPowerIcon sx={{ color: activeTab == "Systems" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Farmers" ? <AgricultureIcon sx={{ color: activeTab == "Farmers" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Payment" ? <PaymentIcon sx={{ color: activeTab == "Payment" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Users" ? <ManageUsers sx={{ color: activeTab == "Users" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: open ? 1 : 0, }} >
                                    <Typography sx={{ fontWeight: "400", fontSize: "1.3rem" }}>
                                        {text}
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: "flex", height: "100%", justifyContent: "flex-end", flexDirection: "column" }}>
                    <Box sx={{ py: { xs: "0rem", md: "3rem" } }}>
                        <Divider />
                        <List>
                            {['Profile', 'Logout'].map((text, index) => (
                                <ListItem key={text} disablePadding sx={{ display: 'block' }}
                                    className={activeTab == text ? "activeTabClass" : ''}
                                >
                                    <ListItemButton
                                        onClick={() => setActiveTabFunc(text)}
                                        sx={{
                                            minHeight: 50,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            py: 1.8,

                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                ml: open ? 0 : 2.3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {text == "Profile" ? <Profile sx={{ color: activeTab == "Profile" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                            {text == "Logout" ? <LogoutIcon sx={{ color: activeTab == "Logout" ? "#fb8500" : "#1d3557" }} fontSize='large' /> : null}
                                        </ListItemIcon>
                                        <ListItemText sx={{ opacity: open ? 1 : 0, }} >
                                            <Typography sx={{ fontWeight: "400", fontSize: "1.3rem" }}>
                                                {text}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>

            </Drawer>
            <BackdropProcess opens={onSending} />
            <AlertDialog msg={msgs} time={2000} type={typeMessage} show={showFlag} NotifyParent={NotifyParent} />
            <Box component="main" sx={{ flexGrow: 1, }}>
                <Box sx={{ background: "#e7e9ed", pt: "4rem", pl: { xs: 0, md: "2rem" } }}>
                    <Outlet>
                    </Outlet>
                </Box>
            </Box>
        </Box>
    );
}


export default DashBoardAdmin











// import { Box } from "@mui/material";

// const DashBoardAdmin = () => {
//     return (<>




//         <Box sx={{ background: "#f4f4f4", pt: "6.4rem", pl: "90rem" }}>
//             <Outlet>
//             </Outlet>
//         </Box>


//     </>);
// }

// export default DashBoardAdmin;