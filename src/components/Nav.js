import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import React from "react";
import { NavLink } from 'react-router-dom';


function App() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const showMenu = Boolean(anchorEl)

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget)
  } 

  const handleMenuClose = (e) => {
    setAnchorEl(null)
  } 

  return (
    <AppBar position="static">
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
        <Menu
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
          <Button color="inherit" component={NavLink} to="/Users/12345">Users/12345</Button> */}
          <MenuItem onClick={handleMenuClose}  component={NavLink} to="/">Home</MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to="/users/1000">My account</MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to="/dogs">Dogs</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Website
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    )
}

export default App