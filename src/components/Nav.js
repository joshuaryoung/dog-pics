import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/system";
import { defaultPrincipal } from "../App";
import { deleteJwtToken } from "../security";


function Nav({ principal, setPrincipal }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuClick = (e) => {
    setShowMenu(state => !state)
  } 

  const handleMenuClose = (e) => {
    setAnchorEl(null)
  }

  const handleLoginClick = (e) => {
    navigate({ pathname: '/login' })
  }

  const handleLogoutClick = () => {
    deleteJwtToken()
    setPrincipal(state => defaultPrincipal)
    navigate({ pathname: '/login' })
    // TODO: Confirmation modal
  }

  return (
    <AppBar position="fixed" className="dogs-app-bar" style={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={showMenu} onClose={e => setShowMenu(false)}>
          <List onClick={e => setShowMenu(false)}>
            <ListItem divider key="logo" sx={{ marginBottom: '20px' }}>
              <ListItemText>Dog Connoisseur</ListItemText>
            </ListItem>
            <ListItem key="home">
              <ListItemButton component={NavLink} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem key="dogs">
              <ListItemButton component={NavLink} to="/dogs">
                <ListItemText>Dog Gallery</ListItemText>
              </ListItemButton>
            </ListItem>
            {principal && principal.id &&
              <ListItem key="myDogs">
                <ListItemButton  component={NavLink} to={`/users/${principal && principal.id}`}>
                  <ListItemText>My Dogs</ListItemText>
                </ListItemButton>
              </ListItem>
            }
          </List>
        </Drawer>
        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={showMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {/* <Button color="inherit" component={NavLink} to="/">Home</Button>
          <Button color="inherit" component={NavLink} to="/Users">Users</Button>
          <Button color="inherit" component={NavLink} to="/Users/12345">Users/12345</Button> }
          <MenuItem onClick={handleMenuClose} component={NavLink} to="/">Home</MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to="/users/1000">My account</MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to="/dogs">Dogs</MenuItem>
          <MenuItem onClick={handleLoginClick} component={NavLink} to="/login">{isLoggedIn ? 'Logout' : 'Login'}</MenuItem>
        </Menu> */}
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Dog Connoisseur
        </Typography>
        <Button color="inherit" onClick={principal && principal.id ? handleLogoutClick : handleLoginClick }>{principal && principal.id ? 'Logout' : 'Login'}</Button>
      </Toolbar>
    </AppBar>
    )
}

export default Nav