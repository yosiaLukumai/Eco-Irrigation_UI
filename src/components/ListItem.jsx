import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Fragment } from "react";

const ListItemm = ({ Icon, Property, Value }) => {
    return (<>
        <ListItem>
            <ListItemAvatar sx={{}}>
                <Avatar >
                    <Icon  sx={{ color: "#1d3558" }} fontWeight="bold" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={
                <Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle1"
                        fontWeight="bold"
                        color="#1d3558"
                    >
                        {Property}
                    </Typography>
                </Fragment>
            } secondary={<Fragment>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color=""
                >
                    {Value}
                </Typography>
            </Fragment>} />
        </ListItem>
    </>);
}

export default ListItemm;