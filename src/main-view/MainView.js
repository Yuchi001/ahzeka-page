import React, {useEffect, useState} from 'react';
import {Stack, Tab, Typography} from "@mui/material";
import {theme_paper} from "../utils/theme/theme";
import {SendMeAnEmail} from "./send-me-an-email/SendMeAnEmail";
import {TabContext, TabList, TabPanel} from "@mui/lab";

export const MainView = () => {
    const [general, setGeneral] = useState(null);
    const [tab, setTab] = useState('0');

    const handleTabChange = (event, newValue) => {
        if(tab === newValue) return;
        setTab(`${newValue}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/general');
                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania danych');
                }
                const data = await response.json();
                setGeneral(data);
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        };

        fetchData();
    }, []);

    if (general === null) return;

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
               paddingBottom="10px"
               spacing={1}
               sx={{ background: theme_paper, overflowY: 'scroll', scrollbarWidth: 'none',
                   '&::-webkit-scrollbar': { display: 'none' }, }}>
            <TabContext value={tab}>
                <Stack direction="row"
                       position="sticky"
                       alignItems="center"
                       justifyContent="center"
                       width="100%"
                       sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="scrollable" value={tab} onChange={handleTabChange} aria-label="Tabs">
                        <Tab value={'0'} label="About me" />
                        <Tab value={'1'} label="Send me an email" />
                    </TabList>
                </Stack>
                <TabPanel value={'0'}>
                    <Typography fontWeight="bolder" variant="h3">{general.home_page_title}</Typography>
                    <br/>
                    <Typography>{general.home_page_description}</Typography>
                </TabPanel>
                <TabPanel value={'1'}>
                    <SendMeAnEmail />
                </TabPanel>
            </TabContext>
        </Stack>
    </Stack>
}