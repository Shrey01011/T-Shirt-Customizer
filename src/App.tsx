import React, { useState, useEffect } from 'react';
import TshirtCustomizer from './TshirtCustomizer';
import {
  CssBaseline, ThemeProvider, createTheme, Box, AppBar, Toolbar, Typography, Container, Link, Button, IconButton, Stack, Drawer, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Theme 1: Dark Modern
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181c1f',
      paper: '#23272a',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontFamily: 'monospace',
  },
});

// Theme 2: Light Professional
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Theme 3: Vibrant Creative
const vibrantTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4081',
    },
    background: {
      default: '#1a237e',
      paper: '#283593',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const themes = [darkTheme, lightTheme, vibrantTheme];
const themeNames = ['Dark Modern', 'Light Professional', 'Vibrant Creative'];

const menuItems = [
  { label: 'View Source Code', variant: 'outlined' },
  { label: 'Sign Up', variant: 'contained', color: 'success' },
  { label: 'Log In', variant: 'outlined' }
];

function App() {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'q') {
        setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <ThemeProvider theme={themes[currentThemeIndex]}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxSizing: 'border-box',
        width: '100vw',
        overflowX: 'hidden'
      }}>
        {/* Responsive Header */}
        <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid #222' }}>
          <Toolbar sx={{ position: 'relative', justifyContent: { xs: 'center', sm: 'space-between' }, minHeight: 56, px: { xs: 1, sm: 2 }, flexDirection: { xs: 'row', sm: 'row' }, alignItems: 'center' }}>
            {/* Left: Logo and Project Name (centered on mobile) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, mr: { xs: 5, sm: 0 } }}>
              <AdbIcon sx={{ mr: 1, color: 'primary.main', fontSize: { xs: 22, sm: 28 } }} />
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 1, fontSize: { xs: 15, sm: 20 } }}>
                T-Shirt Customizer
              </Typography>
              <Typography variant="caption" sx={{ ml: 1, fontWeight: 700, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, px: 1, py: 0.2, fontSize: { xs: 9, sm: 12 } }}>
                PRO
              </Typography>
            </Box>
            {/* Right: Buttons or Drawer */}
            {isMobile ? (
              <Box sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  <Box sx={{ width: 220, p: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                    <List>
                      {menuItems.map((item, idx) => (
                        <ListItem key={item.label} disablePadding>
                          <ListItemButton>
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </Box>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <Button variant="outlined" color="inherit" size="small" sx={{ borderColor: '#444', color: 'text.primary', fontWeight: 500, textTransform: 'none' }}>
                  View Source Code
                </Button>
                <Button variant="contained" color="success" size="small" sx={{ fontWeight: 600, textTransform: 'none', boxShadow: 'none' }}>
                  Sign Up
                </Button>
                <Button variant="outlined" color="inherit" size="small" sx={{ borderColor: '#444', color: 'text.primary', fontWeight: 500, textTransform: 'none' }}>
                  Log In
                </Button>
              </Stack>
            )}
          </Toolbar>
        </AppBar>
        {/* Responsive Body */}
        <Box sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: { xs: '1rem', sm: '2rem' },
          maxWidth: { xs: '100%', md: '1200px' },
          margin: '0 auto',
          width: '100%',
          gap: { xs: 2, md: 0 },
          overflowX: { xs: 'auto', md: 'visible' }
        }}>
          <TshirtCustomizer theme={themes[currentThemeIndex]} />
        </Box>
        {/* Responsive Footer */}
        <Box
          component="footer"
          sx={{
            py: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 2 },
            mt: 'auto',
            backgroundColor: 'background.paper',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            textAlign: { xs: 'center', sm: 'center' }
          }}
        >
          <Container maxWidth="sm" sx={{ px: { xs: 0.5, sm: 2 } }}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: { xs: 12, sm: 14 } }}>
              {'Created by '}
              <Link color="inherit" href="https://github.com/Shrey01011">
                Shrey
              </Link>
              {' • '}
              <Link color="inherit" href="mailto:shreyash.shandilya1011@gmail.com">
                Contact Me
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, fontSize: { xs: 12, sm: 14 } }}>
              {'Phone: +91 8299514034'}<br />
              {'Location: Noida, India'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, fontSize: { xs: 12, sm: 14 }, wordBreak: 'break-word' }}>
              {'Press Alt + Q to switch themes'}<br />
              {'© '}
              {new Date().getFullYear()}
              {' T-Shirt Customizer. All rights reserved.'}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 