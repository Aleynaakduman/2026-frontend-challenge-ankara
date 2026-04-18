import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

import { FaUserSecret, FaCat } from "react-icons/fa";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha('#000', 0.15),
  '&:hover': {
    backgroundColor: alpha('#000', 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1f1f1f',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#1f1f1f',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: '#F4C542',
          color: '#1f1f1f',
        }}
      >
        <Container>
          <Toolbar disableGutters>

          

            {/* LOGO */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FaUserSecret />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: 'bold' }}
              >
                DETECTIVE
              </Typography>
              <FaCat />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* SEARCH */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="İpucu ara..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}