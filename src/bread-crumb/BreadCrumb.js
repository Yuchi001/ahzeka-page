import React from 'react';
import {Link} from "@mui/material";

export const BreadCrumb = ({value, pointerEvents=false, link="/"}) => {
    const valueToLabel = () => {
        const words = value.split('-');
        let result = "";
        words.forEach(w => {
            result += w.substring(0, 1).toUpperCase() + w.substring(1);
        })
        return result;
    }

    return <Link style={{ pointerEvents: !pointerEvents ? 'none' : 'all' }} underline="hover" color="inherit" href={link}>
        {valueToLabel()}
    </Link>
}