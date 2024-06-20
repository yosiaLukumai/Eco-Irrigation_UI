import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { Fragment } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ListItemEditable = ({ Property = "Kinondoni", shortForm="KN" }) => {


    return (<>
        <ListItem secondaryAction={
            <IconButton className="" edge="end" sx={{ '&:hover': { backgroundColor: 'white' } }}>
                <EditIcon onDoubleClick={()=> console.log('Editing....')}  sx={{ color: "#1d3558", fontSize: "1.7rem", cursor:"progress" }} fontWeight="bold" />
                <DeleteIcon sx={{ color: "#1d3558", fontSize: "1.7rem", ml: "0.8rem", }} fontWeight="bold" />
            </IconButton>
        }  >
            <ListItemAvatar sx={{}}>
                <Avatar >
                    <HomeWorkIcon sx={{ color: "#1d3558" }} fontWeight="bold" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={
                <Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        fontWeight="bold"
                        color="#1d3558"
                    >
                        {Property}
                    </Typography>
                </Fragment>} secondary={shortForm} /> 
            <ListItemButton>


            </ListItemButton>

        </ListItem>
    </>);
}

export default ListItemEditable;