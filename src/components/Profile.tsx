import React, { useState } from 'react';
import profileIcon from '../images/profile-icon-2.png'; // Import the profile icon

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="profile">
      <img
        src={profileIcon} // Use the imported profile icon
        alt="Profile"
        onClick={toggleDropdown}
        className="profile-icon"
      />
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
