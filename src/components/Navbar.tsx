"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import AdbIcon from '@mui/icons-material/Adb';
// import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart } from '@mui/icons-material';
import CartModal from './CartModal';
import { useWixClient } from '@/hooks/useWixClient';
// import Cookies from 'js-cookie';
import { useCartStore } from '@/hooks/useCartStore';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/redux/store';

const pages = [
  { label: 'HOMEPAGE', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
];
// const settings = ['Profile', 'Logout'];

// Styled Search Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '20ch',

  },
}));

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // const [, setIsProfileOpen] = React.useState(false)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  // const [isLoading, setIsLoading] = React.useState(false)

  const wixClient = useWixClient()
  // const router = useRouter()
  // const pathName = usePathname()

  // const isLoggedIn = wixClient.auth.loggedIn()

  // const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);

  // const handleProfileClick = () => {
  //   handleCloseUserMenu();
  //   if (!isLoggedIn) {
  //     router.push('/login')
  //   } else {
  //     setIsProfileOpen((prev) => !prev)
  //   }
  // }


  // const handleLogout = async () => {
  //   setIsLoading(true)
  //   Cookies.remove("refreshToken")
  //   const { logoutUrl } = await wixClient.auth.logout(window.location.href);
  //   setIsLoading(false)
  //   setIsProfileOpen(false)
  //   router.push(logoutUrl)
  // }

  const { counter, getCart } = useCartStore()



  React.useEffect(() => {
    getCart(wixClient)
  }, [wixClient, getCart])

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PIXELCART
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  href={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 2,
                    color: 'black',
                    display: 'block',
                    fontFamily: 'serif',
                    fontWeight: 'bolder',
                    fontSize: '18px'
                  }}
                >
                  {page.label}
                </Button>
              ))}



            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',

            }}
          >
            PIXELCART
          </Typography>

          {/* Nav Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '10' } }}>
            {pages.map((page) => (
              <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                <Link href={page.path} passHref>
                  <Typography textAlign="center" sx={{fontWeight:'bolder', fontSize:'18px'}}>{page.label}</Typography>
                </Link>
              </MenuItem>
            ))}

          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          {/* Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/wishlist" passHref>
              <IconButton size="large" color="inherit">
                {/* <Badge badgeContent={wishlistCount} color='error'> */}
                <FavoriteIcon sx={{ color: 'black' }} />
                {/* </Badge> */}
              </IconButton>
            </Link>

            <IconButton size="large" color="inherit"
              onClick={() => { setIsCartOpen((prev) => !prev) }}>
              <Badge badgeContent={counter} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isCartOpen && (
              <CartModal />
            )}

            {/* Avatar & Menu */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                {/* <Avatar alt="User" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {/* {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === 'Logout') {
                      handleLogout();
                    } else if (setting === 'Profile') {
                      router.push('/profile');
                    }
                    handleCloseUserMenu(); // closes the menu after click
                  }}
                >
                  <Typography textAlign="center" fontFamily="serif">
                    {setting === 'Logout' ? (isLoading ? 'Logging out...' : 'Logout') : setting}
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
