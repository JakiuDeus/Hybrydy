import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {Link} from "react-router-dom";



export default function Bar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
                        Serwis Komputerowy Brzoskwinki
                    </Typography>

                        <Link type="button" className="btn btn-primary" to="/AddFailure">Dodaj Zgłoszenie</Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}