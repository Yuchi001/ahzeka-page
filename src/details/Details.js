import React, {useEffect, useState} from 'react';
import {Link, Stack, Typography} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {theme_paper} from "../utils/theme/theme";
import {Photos} from "./photos/Photos";
import {GitHub, SportsEsports} from "@mui/icons-material";

export const Details = () => {
    const [params] = useSearchParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const tabPath = () => {
        const locName = window.location.pathname;
        return params.get('view') ? locName.substring(locName.indexOf('/') + 1, locName.lastIndexOf('/')) : locName.substring(1);
    }

    useEffect(() => {
        if (!params.get('view')) {
            const loc = window.location.pathname;
            navigate(loc.substring(0, loc.indexOf('/details')));
        }

        if (!params.get('view') || !tabPath()) return;

        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://51.68.175.56:5000/api/project/${tabPath()}/${params.get('view')}`);

                if (!response.ok) {
                    console.log("Fetching files failed");
                    return;
                }

                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (error) {
                setData(null);
            }
        };

        fetchDetails();
    }, [tabPath(), params.get('view')]);

    if (!data) return <></>

    return <Stack height="100%"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ scrollbarWidth: 'none',
                      '&::-webkit-scrollbar': { display: 'none' }, }}
                  direction="column">
        <Stack height="100%"
               width="80%"
               direction="column"
               paddingX="20px"
               paddingY="10px"
               spacing={1}
               sx={{ background: theme_paper, overflowY: 'scroll', scrollbarWidth: 'none',
                   '&::-webkit-scrollbar': { display: 'none' }, }}>
            <Typography fontWeight="bolder" variant="h3">{data.data.title}</Typography>
            {data.pngFiles.length > 0 && <Photos pngFiles={data.pngFiles} />}
            <Typography>{data.data.description}</Typography>
            <Stack color="#A13647" spacing={1}>
                {data.data?.links?.github && <Stack alignItems="flex-start" spacing={1} direction="row">
                    <GitHub />:
                    <Link target="_blank" href={data.data.links.github}>{data.data.links.github}</Link>
                </Stack>}
                {data.data?.links?.itchio && <Stack alignItems="flex-start" spacing={1} direction="row">
                    <SportsEsports />:
                    <Link target="_blank" href={data.data.links.itchio}>{data.data.links.itchio}</Link>
                </Stack>}
                {data.data?.links?.other?.map((element, index) => (<Link target="_blank" key={index} href={element}>{element}</Link>))}
            </Stack>
        </Stack>
    </Stack>
}