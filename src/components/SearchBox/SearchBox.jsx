import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBox({ onChange, onSubmit, defaultValue = '' }) {
    const [value, setValue] = React.useState(defaultValue)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(value)
        }
    }

    const handleOnChange = (e) => {
        setValue(e.target.value)
        if (onChange) {
            onChange(e.target.value)
        }
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={handleOnSubmit}
        >
            <InputBase
                value={value}
                onChange={handleOnChange}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search books"
                inputProps={{ 'aria-label': 'search books' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type='submit' color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton>
        </Paper>
    );
}
