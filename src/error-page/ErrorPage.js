import React from 'react';
import {Link, Stack, Typography} from "@mui/material";

export const ErrorPage = () => {
    return <Stack width="100%" alignItems="center" justifyContent="center" sx={{ py: '200px' }}>
        <Typography variant="button" fontWeight="bolder" fontSize={160} color="secondary">404</Typography>
        <Typography variant="h5">Nie znaleziono strony!</Typography>
        <Typography variant="subtitle2" color="primary">Czy chcesz wrócić na <Link href={"/"}>stronę główną</Link>?</Typography>
    </Stack>
}