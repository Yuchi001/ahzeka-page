import React, {useEffect, useState} from 'react';
import {Grid2} from "@mui/material";
import {ElementGeneric} from "./element-generic/ElementGeneric";
import Box from "@mui/material/Box";

export const ElementsListGeneric = ({tabName}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!tabName || data?.l) return;

        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://51.68.175.56:5000/api/data/${tabName}`);

                if (!response.ok) {
                    console.log("Fetching files failed");
                    return;
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                setData(null);
            }
        };

        fetchProjects();
    }, [tabName]);

    console.log(data)
    if (!data) return <></>

    return <Box zIndex="-2" sx={{ marginLeft: '7%', '&::-webkit-scrollbar': {display: 'none'}, marginRight: '7%', marginTop: '3%', marginBottom: '3%' }}>
        <Grid2 container
               zIndex="-2"
               width="100%"
               height="100%"
               spacing={3}
               justifyContent="left">
            {data.projects.map((element, index) => (<ElementGeneric key={index} element={element} />))}
        </Grid2>
    </Box>
}