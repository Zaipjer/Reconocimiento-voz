import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import uuid from 'react-uuid'
import { NeonDiv } from './StyledComponents';

const DisplayNotes = ({ data }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                {
                    data.map((savedNote) => (
                        <Grid item xs={12} sm={4} key={savedNote.group}>
                            {savedNote.name.map((string) => (
                                <NeonDiv as="div" key={uuid()} status={savedNote.group}>{string}</NeonDiv>
                            ))}
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default DisplayNotes;