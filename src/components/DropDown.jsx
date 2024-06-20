import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const CustomDropDown = ({ placeholder = "branch", label = "brach", vals,valseen, helperText = "", setValue, defaultVal=false }) => {
    const [va, setva] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        setva(event.target.value)
    };

    return (
        <FormControl sx={{
            width: "100%", "& .MuiInputLabel": {
                fontWeight: "500",
                color: "#1d3557",
            },
            '& .MuiInputBase-root': {
                '& fieldset': {
                    // borderWidth: '0.3px', 
                    // borderColor: "red"
                },
                fontSize: '1.1rem',
            },
        }}>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}

            <InputLabel id="demo-simple-select-helper-label">{placeholder}</InputLabel>
            <Select
                labelId="customDropDown"
                id="customDropDown"
                value={va}
                label={label}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {/* vals?.map((v, index)) */}
                {
                    vals?.map((v, i) => (
                        <MenuItem key={i} value={v}>{valseen[i]}</MenuItem>
                    ))
                }

            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>

    );
}


export default CustomDropDown
