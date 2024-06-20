import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';



const rows = [
    ["READ", false],
    ["CREATE", false],
    ["DELETE", false],
    ["UPDATE", false],
];

export default function RolesTable({ passDataParent }) {

    const [read, setRead] = useState(false)
    const [create, setCreate] = useState(false)
    const [rerender, setRender] = useState(false)
    const [delet, setDelet] = useState(false)
    const [update, setUpdate] = useState(false)
  

    let selection = [false, false, false, false]
 

    useEffect(() => {
        selection = [read, create, delet, update]
        passDataParent(selection)
    }, [rerender])
    return (
        <TableContainer component={Box}>
            <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Features</TableCell>
                        <TableCell align="right">
                            Allow
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row[0]}
                            </TableCell>
                            <TableCell align="right">
                                <FormControlLabel onChange={(e) => {
                                    index == 0 ? setRead(e?.target?.checked) : index == 1 ? setCreate(e?.target?.checked) : index == 2 ? setDelet(e?.target?.checked) : setUpdate(e?.target?.checked)
                                    setRender(!rerender)
                                }
                                } control={<Checkbox defaultChecked={false} />} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

