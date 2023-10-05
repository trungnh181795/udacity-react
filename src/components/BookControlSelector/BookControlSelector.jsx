import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { update } from '../../api/books';
import { Check } from '@mui/icons-material';
import { IconButton, ListItemIcon } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Loading from '../Loading/Loading';

const options = [
    {
        value: 'read',
        label: 'Read',
    },
    {
        value: 'wantToRead',
        label: 'Want to read',
    },
    {
        value: 'currentlyReading',
        label: 'Currently reading',
    }
]

export default function BookControlSelector({ id, currentShelf, getBook }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = (e) => {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleOnMenuClick = async (event, shelf) => {
        handleClose(event)
        setLoading(true)
        await update(id, shelf)
        setLoading(false)
        await getBook()
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                sx={{
                    bgcolor: 'info.main', '&:hover': {
                        bgcolor: 'info.dark'
                    }
                }}
            >
                {loading ? <Loading size={24} /> : <ArrowDropDownIcon />}
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1000 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {options.map(({ value, label }) => (
                                        <MenuItem sx={{ display: 'flex' }} key={value} onClick={(e) => handleOnMenuClick(e, value)}>
                                            {currentShelf === value ? <ListItemIcon>
                                                <Check />
                                            </ListItemIcon> : null}
                                            {label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Stack>
    );
}
