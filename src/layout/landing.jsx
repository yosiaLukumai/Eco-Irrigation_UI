import { Box, Divider } from "@mui/material";
import AppBarComponent from "../components/AppBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";


const Landing = () => {

    return (<>
        <Box sx={{ mx: { xs: 0, sm: 2, md: 5, lg: 18, xl: 26, } }}  >
                <AppBarComponent />
                <Outlet></Outlet>
                <Footer />
        </Box>


    </>);
}

export default Landing;