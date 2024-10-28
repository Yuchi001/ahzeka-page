import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import {Outlet} from "react-router-dom";
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Paper,
    Stack,
    styled,
    Typography
} from "@mui/material";
import {AccountBox, AccountCircle, EventNote, Inbox, Mail, Menu, Sailing, School} from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function App() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ padding: 10, display: 'flex' }}>
            <AppBar sx={{ boxShadow: 'none', background: '#FFD3D2', borderBottom: 'solid #e0e0e0 1px' }}>
                <Stack justifyContent="space-between" alignItems="center" paddingX="10px">
                    <Stack direction="row" justifyContent="left" width="100%">
                        <IconButton onClick={handleDrawerOpen}><Menu/></IconButton>
                    </Stack>
                </Stack>
            </AppBar>
            <Stack sx={{ position: 'absolute', background: '#FFD3D2', borderTop: 'solid #e0e0e0 1px', bottom: 0, left: 0, right: 0, height: 125 }}>
                <Typography>test</Typography>
            </Stack>
            <Drawer
                color="red"
                PaperProps={{
                    sx: {
                        backgroundColor: "white",
                        color: 'black'
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
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Stack paddingY="10px" paddingX="15px" direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row">
                        <AccountBox color='#C1655E' />
                        <Typography color='#C1655E' fontWeight="bold">A</Typography>
                        <Typography color="black" fontWeight="bold">ngelika</Typography>
                        <Typography color='#C1655E' fontWeight="bold">K</Typography>
                        <Typography color="black" fontWeight="bold">rakowiak</Typography>
                    </Stack>
                    <IconButton onClick={handleDrawerClose}>
                        {<ChevronLeftIcon />}
                    </IconButton>
                </Stack>
                <Divider />
                <List>
                    <ListItem key="School projects" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <School />
                            </ListItemIcon>
                            <ListItemText primary="School projects" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Private projects" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Private projects" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key="Events" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EventNote />
                            </ListItemIcon>
                            <ListItemText primary="Events" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Hobbies" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Sailing />
                            </ListItemIcon>
                            <ListItemText primary="Hobbies" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        <Main open={open}>
            <Outlet />
        </Main>
    </Box>
  );
}

export default App;
