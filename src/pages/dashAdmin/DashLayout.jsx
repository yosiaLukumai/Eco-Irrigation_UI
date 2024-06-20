import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import { retriveData, save } from '../../Utils/Localstorage';

const drawerWidth = 210;

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
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
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

const  DashLayout = () => {
    const theme = useTheme();
    const navigator = useNavigate()
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(retriveData("activeTab")?.activeTab)
    console.log(activeTab, "ActiveTab....");

    const setActiveTabFunc = (tabName) => {
        save("activeTab", { activeTab: tabName })
        setActiveTab(tabName)
        if(tabName == "Logout") {
            return
        }
        if(tabName != "Dashboard") {
        navigator(tabName)
        }else {
            navigator("")
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "white", py: 0.5 }} open={open}>
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
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon fontSize='large' sx={{ color: "#1d3557" }} />
                    </IconButton >
                    <Box className="" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <Box className="inputSearch">
                                <SearchIcon />
                                <Typography sx={{ pl: "1rem", fontWeight: 350, fontSize: "1.2rem", opacity: "0.76" }}>
                                    Search user or Meter...
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
                <DrawerHeader sx={{ py: 1.3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant='h5' sx={{ fontWeight: "600" }}>

                            <span style={{ color: "#1d3557" }}>AFM</span>
                            <span style={{ color: "#419bda" }}> Tech</span>
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon sx={{ color: "#1d3557" }} fontSize='large' fontWeight="bolder" />
                        </IconButton>
                    </Box>

                </DrawerHeader>
                <Divider />
                <List>
                    {['Dashboard', 'Usage', 'Meter', 'Client', 'Payment', 'Users'].map((text, index) => (
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
                                    {text == "Dashboard" ? <Dashboard sx={{ color: activeTab == "Dashboard" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Usage" ? <Usage sx={{ color: activeTab == "Usage" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Meter" ? <Meter sx={{ color: activeTab == "Meter" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Client" ? <Users sx={{ color: activeTab == "Client" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Payment" ? <PaymentIcon sx={{ color: activeTab == "Payment" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Users" ? <ManageUsers sx={{ color: activeTab == "Users" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
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

                <Box sx={{display:"flex", height:"100%", justifyContent:"flex-end", flexDirection:"column"}}>
                    <Box sx={{py:{xs:"1rem", md: "4rem"}}}>
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
                                    {text == "Profile" ? <Profile sx={{ color: activeTab == "Profile" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
                                    {text == "Logout" ? <LogoutIcon sx={{ color: activeTab == "Logout" ? "#419bda" : "#1d3557" }} fontSize='large' /> : null}
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
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            </Box>
        </Box>
    );
}


export default DashLayout