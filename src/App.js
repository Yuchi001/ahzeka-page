import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {
    Alert,
    Avatar,
    Breadcrumbs,
    Link, Snackbar,
    Stack,
    styled,
    Typography
} from "@mui/material";
import {
    AccountCircle, AutoAwesome, Email,
    EventNote, GitHub, LinkedIn, LocalPhone,
    Menu,
    Sailing,
    School
} from "@mui/icons-material";
import {theme_main, theme_paper} from "./utils/theme/theme";
import {BreadCrumb} from "./bread-crumb/BreadCrumb";
import './App.css';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        height: 'calc(100vh - 198px)',
    }),
);

function App() {
    const [open, setOpen] = useState(false);
    const [showCopySnackBar, setShowCopySnackBar] = useState(false);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [general, setGeneral] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://51.68.175.56:5000/api/general');
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setShowCopySnackBar(true);
            });
    }

    const locationIs = (path) => {
        return window.location.pathname === path;
    }

    const tabPath = () => {
        const locName = window.location.pathname;
        return params.get('view') ? locName.substring(locName.indexOf('/') + 1, locName.lastIndexOf('/')) : locName.substring(1);
    }

    if (general === null) return;

    return (
       <div>
           <Box sx={{ paddingTop: '98px', paddingBottom: '0px', display: 'flex' }}>
               <Stack sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100 }}>
                   <Stack direction="row" height="68%" justifyContent="space-between" alignItems="center" paddingX="10px">
                       <Stack width="33%" height="100%" direction="row" justifyContent="left" alignItems="center">
                           <IconButton onClick={handleDrawerOpen}><Menu/></IconButton>
                       </Stack>
                       <Stack direction="row" justifyContent="center" alignItems="center" width="33%">
                           <AutoAwesome sx={{ color: theme_main, scale: 1.3, paddingRight: 0.3 }} />
                           <Typography fontWeight="bolder" fontSize="2rem">Angelika</Typography>
                           <Typography fontWeight="bolder" fontSize="2rem" sx={{ color: theme_main }}>Krakowiak</Typography>
                       </Stack>
                       <Stack width="33%"/>
                   </Stack>
                   <Stack height="30%" alignItems="center" justifyContent="center" paddingX="10px"  sx={{ boxShadow: 'none', background: theme_main }}>
                       <Breadcrumbs sx={{ color: 'white' }}>
                           <BreadCrumb value="home" pointerEvents={!locationIs('/')} />
                           {!locationIs('/') && <BreadCrumb value={tabPath()} pointerEvents={true} link={`/${tabPath()}`} />}
                           {params.get("view") && <BreadCrumb value={params.get("view")} />}
                       </Breadcrumbs>
                   </Stack>
               </Stack>
               <Stack zIndex={1} direction="row" justifyContent="space-around" alignItems="center" sx={{ position: 'absolute', background: theme_main, bottom: 0, left: 0, right: 0, height: 100 }}>
                   <Stack justifyContent="left" spacing={1}>
                       <Stack direction="row" sx={{ color: 'white' }} spacing={1}>
                           <LinkedIn />:
                           <Link target="_blank" href={general.linked_link} underline="hover" color="inherit">{general.linked_link}</Link>
                       </Stack>
                       <Stack direction="row" sx={{ color: 'white' }} spacing={1}>
                           <GitHub />:
                           <Link target="_blank" href={general.github_link} underline="hover" color="inherit">{general.github_link}</Link>
                       </Stack>
                   </Stack>
                   <Stack justifyContent="left" spacing={1}>
                       <Stack onClick={() => copyText(general.phone_number)} direction="row" sx={{ color: 'white' }} spacing={1}>
                           <LocalPhone />:
                           <Link underline="hover" color="inherit">{general.phone_number}</Link>
                       </Stack>
                       <Stack onClick={() => copyText(general.email)} direction="row" sx={{ color: 'white' }} spacing={1}>
                           <Email />:
                           <Link underline="hover" color="inherit">{general.email}</Link>
                       </Stack>
                   </Stack>
               </Stack>
               <Main open={open}>
                   <Outlet/>
               </Main>
               <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={showCopySnackBar} autoHideDuration={1000} onClose={() => setShowCopySnackBar(false)}>
                   <Alert
                       onClose={() => setShowCopySnackBar(false)}
                       severity="success"
                       variant="filled"
                       sx={{ width: '100%' }}
                   >
                       Text copied successfully!
                   </Alert>
               </Snackbar>
           </Box>
           <Drawer
               PaperProps={{
                   sx: {
                       backgroundColor: "white",
                       color: 'black',
                       background: theme_paper,
                   }
               }}
               sx={{
                   width: drawerWidth,
                   flexShrink: 0,
                   '& .MuiDrawer-paper': {
                       width: drawerWidth,
                       boxSizing: 'border-box',
                   },
               }}
               onClose={handleDrawerClose}
               variant="temporary"
               anchor="left"
               open={open}
           >
               <Stack paddingY="10px" paddingX="15px" direction="row" justifyContent="space-between"
                      alignItems="center">
                   <Stack direction="row" spacing={2} alignItems="center">
                       <Avatar sx={{width: 45, height: 45, background: theme_main}}>AK</Avatar>
                       <Stack>
                           <Typography fontWeight="bold">About Me</Typography>
                           <Typography fontWeight="lighter">Angelika Krakowiak</Typography>
                       </Stack>
                   </Stack>
                   <IconButton onClick={handleDrawerClose}>
                       {<ChevronLeftIcon/>}
                   </IconButton>
               </Stack>
               <Divider/>
               <List>
                   <ListItem key="School projects" disablePadding onClick={() => navigate("school-projects")}>
                       <ListItemButton>
                           <ListItemIcon>
                               <School sx={{color: theme_main}}/>
                           </ListItemIcon>
                           <ListItemText primary="School projects"/>
                       </ListItemButton>
                   </ListItem>
                   <ListItem key="Private projects" disablePadding onClick={() => navigate("private-projects")}>
                       <ListItemButton>
                           <ListItemIcon>
                               <AccountCircle sx={{color: theme_main}}/>
                           </ListItemIcon>
                           <ListItemText primary="Private projects"/>
                       </ListItemButton>
                   </ListItem>
               </List>
               <Divider/>
               <List>
                   <ListItem key="Events" disablePadding onClick={() => navigate("events")}>
                       <ListItemButton>
                           <ListItemIcon>
                               <EventNote sx={{color: theme_main}}/>
                           </ListItemIcon>
                           <ListItemText primary="Events"/>
                       </ListItemButton>
                   </ListItem>
                   <ListItem key="Hobbies" disablePadding onClick={() => navigate("hobbies")}>
                       <ListItemButton>
                           <ListItemIcon>
                               <Sailing sx={{color: theme_main}}/>
                           </ListItemIcon>
                           <ListItemText primary="Hobbies"/>
                       </ListItemButton>
                   </ListItem>
               </List>
               <div style={{background: theme_paper, height: '30%', borderRadius: '0% 90% 0% 0%'}}/>
               <div style={{background: theme_main, height: '100%', borderRadius: '0% 100% 0% 0%'}}>
                   <div style={{background: theme_paper, height: '100%', borderRadius: '0% 0% 0% 100%'}}/>
               </div>
               <div style={{background: theme_main, height: '222px' }} />
           </Drawer>
       </div>
    );
}

export default App;
