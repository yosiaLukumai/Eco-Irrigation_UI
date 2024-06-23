import { Grid, Button, Box, Avatar, Typography, CircularProgress, Chip, createTheme, Menu, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { retriveData } from "../../Utils/Localstorage";


import Configuration from "../../App/config";
import AddNewMeter from "../../components/addNewMeter";
import BackdropProcess from "../../components/Backdrop";
import { ThemeProvider } from "@emotion/react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddNewPackage from "../../components/AddNewPackage";



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

const Payment = () => {
    const [user, setUser] = useState(retriveData(Configuration.localStorageKey))
    const [loading, setLoading] = useState(true)
    const [rowsPerPage, setRowPerPage] = useState(7)
    const [count, setCount] = useState(null)
    const [open, setOpen] = useState(false)
    const [openPackage, setOpenPackage] = useState(false)
    const [openRole, setOpenRole] = useState(false)
    const [meters, setMeters] = useState(null)
    const [thereData, setThereData] = useState(false)
    const [branchesMaps, setBranchesMap] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [branchesShortForms, setbranchesShortForms] = useState(null)


    const changePage = async (page) => {
        console.log(page);
        setIsLoading(true)
        try {
            const response = await fetch(`${Configuration.backendUrl}/company/find/systems`, {
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
                setMeters(result?.Data?.data)
                console.log("setting no loading...");

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

    const [anchorEl, setAnchorEl] = useState(null);
    const openss = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };



    useEffect(() => {
        async function fetchMeters() {
            try {
                const response = await fetch(`${Configuration.backendUrl}/payment/find/transaction`, {
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
                    setMeters(result?.Data?.data)
                    setCount(result?.Data?.count)
                    setThereData(false)
                    setLoading(false)
                    setIsLoading(false)

                } else {
                    setThereData(true)
                    setLoading(false)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(" Error in reading.....");
                console.log(error);
                setIsLoading(false)
            }
        }

        fetchMeters()

    }, [reload])

    // fetching the company branches (Sites)

    const nowClose = () => {
        setOpen(false)
        setOpenRole(false)
        setReload(!reload)
    }
    const nowCloseT = () => {
        setOpenPackage(false)
    }
    const columns = [
        {
            name: "transactionId",
            label: "TransactionID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Amount",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: false,
                customFilterListOptions: { render: v => `Status: ${v}` },
                customBodyRenderLite: (elID) => {
                    return (
                        meters[elID]?.status == "success" ? <Chip size="small" label="Success" color="primary" /> : <Chip size="small" label="Pending" sx={{ background: "#f73378 !important" }} color="secondary" />
                    )
                }
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
        // selectableRowsHideCheckboxes: false,
        selectableRows: "none",
        page: pageNumber,
        count: count,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [7, 14],
        serverSide: true,
        onChangePage: (page) => {
            changePage(page)
        },
        onSearchChange: (Search) => {
            console.log(Search);
        },
        onFilterChange: (col, filList, x, y, q, ds) => {
            console.log(col, q);
        }
    };




    // fetching the company meters (Sites)

    return (<>

        {loading && <BackdropProcess opens={loading} />}
        <Box sx={{ pt: { xs: "2.3rem", md: "2.5rem" }, px: { md: "3rem", xs: "0.2rem" }, height: { md: "92.5vh", xs: "" } }}>
            {(!loading && !thereData && meters) && <Grid justifyContent={"center"} alignContent={"center"} container spacing={2}>
                <Grid className="" md={12} xs={12} sx={{ overflow: "" }} item>
                    <ThemeProvider theme={TableTheme}>
                        {
                            <Box sx={{ marginBottom: "0.2rem" }}>
                                <Typography variant="" sx={{ fontSize: "18px", color: "#606469", fontWeight: "500" }}>
                                    All Payments
                                    {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                                </Typography>
                            </Box>

                        }
                        <MUIDataTable
                            data={meters}
                            columns={columns}
                            options={options}
                        />
                    </ThemeProvider>

                </Grid>
            </Grid>}

            {
                (!meters && !loading) && <Typography variant="h6" textAlign={"center"}>
                    There is no Payments
                </Typography>
            }
        </Box>
    </>);
}

export default Payment;

