import React from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useState } from 'react';
import ProfileIcon from '@mui/icons-material/AccountCircle';

const Profile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar alt="Profile">
          <ProfileIcon/>
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;