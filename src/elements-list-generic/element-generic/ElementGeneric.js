import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Grid2, Typography} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

export const ElementGeneric = ({element}) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const [params, setSearchParams] = useSearchParams();

    const objWidth = 300;

    const handleClick = () => {
        if (!element) return;
        navigate("details");
        const updatedParams = new URLSearchParams(params);
        updatedParams.set('view', element.data.id);
        setSearchParams(updatedParams);
    }

    return <Grid2
        zIndex={0}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        xs="auto"
        style={{
            width: objWidth,
            overflow: 'visible',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.1s ease-in-out',
            cursor: hovered ? 'pointer' : 'default',
        }}>
        <Box component="img" sx={{ objectFit: 'cover', borderRadius: '5px' }} width={objWidth} height={objWidth * (3/4)} src={element.thumbnail} alt={element.projectName + "_thumbnail"} />
        <Typography fontWeight="bold">{element.data.title}</Typography>
        <Typography marginY="-5px" color="primary" fontWeight="lighter" fontSize="0.8rem">{element.data.short_description}</Typography>
    </Grid2>
}