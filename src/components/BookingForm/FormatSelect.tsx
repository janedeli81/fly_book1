import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

function FormatSelect() {

    const [select, setSelect] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value as string);
    };

    return(

        <Box sx={{ maxWidth: 100, maxHeight: 1 }} marginLeft={2}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Format</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={select}
                    label="Format"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Month</MenuItem>
                    <MenuItem value={20}>Week</MenuItem>
                    <MenuItem value={30}>Day</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default FormatSelect
