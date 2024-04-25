import * as React from 'react';
import { Grid } from '@mui/material';

export default function Content({ children }) {
    return (

        <Grid component={'div'} className='w-full'>
            {children}
        </Grid>
    );
}
