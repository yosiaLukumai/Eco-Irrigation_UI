import { Grid, Button, Box, Typography, CircularProgress, createTheme, Menu, Chip, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { retriveData } from "../../Utils/Localstorage";

import { ThemeProvider } from "@emotion/react";
import Configuration from "../../App/config";
import AddNewClient from "../../components/AddNewClient";
import BackdropProcess from "../../components/Backdrop";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TableTheme = createTheme({
    components: {
        MUIDataTableBodyCell: {
            styleOverrides: {
                root: {
                    padding: "0.3rem 0.5rem",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#09090b",
                    fontFamily: "sans-serif, Geneva, Verdana, sans-serif"
                },

            }
        },
        MUIDataTableHeadCell: {
            styleOverrides: {
                root: {
                    padding: "0.3rem 0.8rem",
                    fontSize: "14px",
                    color: "#a1a1aa",
                    lineHeight: "20px",
                    fontWeight: "500",
                    fontFamily: "sans-serif Segoe UI Tahoma Geneva Verdana sans-serif"

                },

            }
        },
        MUIDataTable: {
            styleOverrides: {
                root: {
                    boxShadow: "none !important",
                }
            }
        },
        MUIDataTableToolbar: {
            styleOverrides: {
                root: {
                    padding: "0.01rem 1.2rem",
                    margin: "0"
                }
            }
        },
        MUIDataTableFooter: {
            styleOverrides: {
                root: {
                    padding: "0.3rem 0.5rem",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#09090b",
                    fontFamily: "sans-serif, Geneva, Verdana, sans-serif"
                }
            }
        }
    }
})

const Client = () => {
    const [user, setUser] = useState(retriveData(Configuration.localStorageKey))
    const [loading, setLoading] = useState(true)
    const [rowsPerPage, setRowPerPage] = useState(7)
    const [count, setCount] = useState(null)
    const [unassignedKits, setUnassignedKits] = useState(null)
    const [companyBranches, setCompanyBranches] = useState(null)
    const [companyBranchesIDs, setCompanyBranchesIDs] = useState(null)
    const [open, setOpen] = useState(false)
    const [clients, setClients] = useState(null)
    const [thereData, setThereData] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const [anchorEl, setAnchorEl] = useState(null);
    const openss = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };




    const changePage = async (page) => {
        console.log(page);
        setIsLoading(true)
        try {
            const response = await fetch(`${Configuration.backendUrl}/client/find`, {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    initial: false,
                    rowperpage: 7,
                    currentpage: page + 1,
                })
            })
            let result = await response.json()
            if (result.Success) {
                setClients(result?.Data?.data)
                setIsLoading(false)

            } else {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
        setPageNumber(page)
    }

    const editMeter = (id) => {
        console.log("editing with Id: ", id);
    }

    const deleteID = (id) => {
        console.log("Deleting with ID:  ", id);
    }

    const isMounted = useRef(false);
    const isMounted2 = useRef(false)
    const compID = retriveData(Configuration.localStorageKey)?.Company?._id
    const openNewMeterDialog = (id) => {
        if (id == 1) {
            setOpen(true)
            return
        }
    }
    useEffect(() => {
        async function fetchMeters() {
            try {
                const response = await fetch(`${Configuration.backendUrl}/client/find`, {
                    mode: "cors",
                    method: "POST",
                    body: JSON.stringify({
                        rowperpage: 7,
                        currentpage: 1,
                        initial: true
                    })
                })
                const result = await response.json()

                if (result?.Success) {
                    setClients(result?.Data?.data)
                    setCount(result?.Data?.count)
                    setThereData(false)
                    setLoading(false)

                } else {
                    setThereData(true)
                    setLoading(false)
                }
            } catch (error) {
                console.log(" Error in reading.....");
                console.log(error);
            }
        }
        if (!isMounted2.current) {
            isMounted2.current = true
            fetchMeters()
            setIsLoading(false)
        }

    }, [])


    const nowClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${Configuration.backendUrl}/company/find/unassigned/systems`, {
                    mode: "cors",
                    method: "GET"
                })
                const result = await response.json()
                if (result?.Success) {
                    console.log(result?.Data);
                    let filT = result?.Data?.data?.map(e => e?._id)
                    setUnassignedKits(filT)
                } else {
                    setThereData(true)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (!isMounted.current) {
            isMounted.current = true;
            fetchData()
        }

    }, [])
    const columns = [
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "balance",
            label: "Balance",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "verified",
            label: "Status",
            options: {
                filter: true,
                sort: false,
                customFilterListOptions: { render: v => `Status: ${v}` },
                customBodyRenderLite: (elID) => {
                    return (
                        clients[elID]?.status == "active" ? <Chip label="Active" color="primary" /> : <Chip label="Not Active" sx={{ background: "#f73378 !important" }} color="secondary" />
                    )
                }
            }
        },
        {
            name: "balance",
            label: "Amount",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Action",
            label: "",
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataI) => {
                    return (
                        <Box sx={{ height: "", display: "flex" }} className=''>
                            {/* <EditIcon fontSize="medium" onClick={() => editMeter(meters[dataI]?._id)} />
                            <DeleteIcon sx={{ ml: "1rem" }} fontSize="medium" onClick={() => deleteID(meters[dataI]?._id)} /> */}
                            <MoreHorizIcon fontSize="small" onClick={handleClick} />
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openss}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                                <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                            </Menu>
                        </Box>
                    )
                }
            }
        },
    ];

    const options = {
        selectableRows: "none",
        page: pageNumber,
        count: count,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [7, 14],
        serverSide: true,
        onChangePage: (page) => {
            changePage(page)
        }

    };




    return (<>

        {loading && <BackdropProcess opens={loading} />}
        {open && <AddNewClient openFlag={open} notifyParent={nowClose} pumpIDs={unassignedKits} valID={companyBranchesIDs} valu={companyBranches} />}

        <Box sx={{ pt: { xs: "2.3rem", md: "2.5rem" }, px: { md: "3rem", xs: "0.2rem" }, height: { md: "92.5vh", xs: "" } }}>
            <Grid container sx={{ background: "", py: "0rem", pb: "1.2rem", borderRadius: "1.4rem" }}>
                <Grid sx={{ display: "flex", justifyContent: "flex-end", px: { xs: "0.1rem", md: "0rem" }, pt: "0rem" }} md={12} xs={12} item>
                    <Button onClick={() => openNewMeterDialog(1)} variant="contained" sx={{ textTransform: "none", padding: "0.5rem 1.2rem", fontWeight: "bold", borderRadius: "1.2rem" }} className="hoveredButton">
                        <Add sx={{ pr: "0.3rem" }} />
                        Add Client
                    </Button>

                </Grid>
            </Grid>
            {(!loading && !thereData && clients) && <Grid justifyContent={"center"} alignContent={"center"} container spacing={2}>
                <Grid className="" md={12} xs={12} sx={{ overflow: "" }} item>
                    <ThemeProvider theme={TableTheme}>
                        {
                            <Box sx={{ marginBottom: "0.2rem" }}>
                                <Typography variant="" sx={{ fontSize: "18px", color: "#606469", fontWeight: "500" }}>
                                    All Clients
                                    {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                                </Typography>
                            </Box>

                        }
                        <MUIDataTable
                            data={clients}
                            columns={columns}
                            options={options}
                        />

                    </ThemeProvider>

                </Grid>
            </Grid>}

            {
                (!clients && !loading) && <Typography variant="h6" textAlign={"center"}>
                    There is no clients
                </Typography>
            }

            {/* {
                loading && <Box display={"flex"} flexDirection={"column"} sx={{ width: "100%", alignItems: "center", justifyContent: "center", alignContent: 'center' }}>
                    <CircularProgress />
                    <Typography variant="h6" pt="0.3rem" sx={{ color: "#1d3557", pt: "1.2rem" }}>
                        Processing...
                    </Typography>
                </Box>
            } */}
        </Box>
    </>);
}

export default Client;

