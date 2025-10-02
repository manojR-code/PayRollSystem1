import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomePages from './Components/Home';
import Currency from './Components/Currency';
import UserTable from './assets/UserTable';
import Payments from './assets/Payments';
import AccordionUsage from './Components/Forms';
const Days = (num) => {
  switch (num) {
    case 0: return 'Sunday'
    case 1: return 'Monday'
    case 2: return 'Tuesday'
    case 3: return 'Thursday'
    case 4: return 'Friday'
    case 5: return 'Saturday'
  }
}
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let [selected, setselected] = React.useState('Home');
  function Call() {
    switch (selected) {
      case 'Home':
        return <HomePages />
      case 'Registaration Forms':
        return <AccordionUsage/>
      case 'Empoyee Details':
        return <UserTable />
      case 'Payments':
        return <Payments />
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Dates = new Date();
  const day = Dates.getDay();
  const [date, setdate] = new React.useState(Days(day));
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{
          background: '#ba68c8'

          , color: 'white', fontFamily: 'Inter'
        }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,

                },
                open && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Manoj And Group
            </Typography>
            <Typography variant="h6" noWrap component="div" style={{ position: 'absolute', right: '20px', marginTop: '10px' }}>
              <h6>{date}</h6>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Home', 'Registaration Forms', 'Payments'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block', }}>
                <ListItemButton
                  onClick={() => setselected(text)}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                        justifyContent: 'initial',
                      }
                      : {
                        justifyContent: 'center',
                      },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                          mr: 3,
                        }
                        : {
                          mr: 'auto',
                        },
                    ]}
                  >
                    {index === 0 ? <HomeIcon /> : index === 1 ? <AppRegistrationIcon /> : index == 2 ? <CurrencyRupeeIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                          opacity: 1,
                        }
                        : {
                          opacity: 0,
                        },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Empoyee Details'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => setselected(text)}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                        justifyContent: 'initial',
                      }
                      : {
                        justifyContent: 'center',
                      },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                          mr: 3,
                        }
                        : {
                          mr: 'auto',
                        },
                    ]}
                  >
                    {index === 0 ? <PeopleAltIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                          opacity: 1,
                        }
                        : {
                          opacity: 0,
                        },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {
          Call()
        }
      </Box>
    </>
  );
}
