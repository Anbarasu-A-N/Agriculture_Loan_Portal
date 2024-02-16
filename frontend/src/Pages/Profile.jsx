


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { logout } from '../redux/actions';
import ChangePassword from './ChangePassword';
import UpdateUserDetails from './UpdateUserDetails';
import DeleteUser from './DeleteUser';
import { BASE_URL } from '../Config.jsx';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State to store profile image
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Get isLoggedIn from Redux state

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const emailId = localStorage.getItem('emailId');
      if (!isLoggedIn && !emailId && token) { // Check if user is not logged in
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
        params: { emailId },
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      setUser(response.data);
      setIsLoading(false);

      // Fetch profile image
      fetchProfileImage(response.data.profileImagePath);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fetchProfileImage = async (imageName) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get(`${BASE_URL}/userfunction/getImage/${imageName}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      setProfileImage(URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
      // Handle error if unable to fetch profile image
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const userId = user ? user.userid : null;
      if (!userId) {
        alert('User ID not found. Please try again later.');
        return;
      }

      await axios.post(`${BASE_URL}/userfunction/${userId}/uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });

      // Fetch updated user profile after successful upload
      await fetchProfile();

      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image. Please try again later.');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update Redux state
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    navigate('/login');
  };
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className='profilebgcolor'>
        <br/>
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-image">
              {profileImage ? (
                <img
                  src={profileImage}
                  style={{ width: '200px', height: '200px', borderRadius: '100px'}}
                  alt="User"
                />
              ) : (
                <p>No profile image available</p>
              )}
              <input type="file" onChange={handleFileChange} />
              <button className="profile-button" id="profile-button" onClick={handleUpload}>Upload Photo</button>
            </div>
            <div className="profile-info">
              <h4>Full Name: {user ? user.firstName : ''}&nbsp;{user ? user.lastName : ''}</h4>
              <p>Age: {user ? user.age : ''}</p>
              <p>Gender: {user ? user.gender : ''}</p>
              <p>Email: {user ? user.emailId : ''}</p>
              <p>Phone: {user ? user.mobile : ''}</p>
              <button className="profile-button1" id="profile-button1" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <h2>Settings</h2>
            </div>
            <div className="profile-section">
              <br/>
              <UpdateUserDetails/><ChangePassword/><DeleteUser/>
              <h2>
                <Link to="/review">Give Your Review</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;





/*
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { logout } from '../redux/actions';
import ChangePassword from './ChangePassword';
import UpdateUserDetails from './UpdateUserDetails';
import DeleteUser from './DeleteUser';
import { BASE_URL } from '../Config.jsx';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State to store profile image
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Get isLoggedIn from Redux state

  const fetchProfile = useCallback(async () => {
    try {
      const emailId = localStorage.getItem('emailId');
      if (!isLoggedIn && !emailId && token) { // Check if user is not logged in
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
        params: { emailId },
      });
      setUser(response.data);
      setIsLoading(false);

      // Fetch profile image
      fetchProfileImage(response.data.profileImagePath);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fetchProfileImage = async (imageName) => {
    try {
      const response = await axios.get(`${BASE_URL}/userfunction/getImage/${imageName}`, {
        responseType: 'blob',
      });
      setProfileImage(URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
      // Handle error if unable to fetch profile image
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const userId = user ? user.userid : null;
      if (!userId) {
        alert('User ID not found. Please try again later.');
        return;
      }

      await axios.post(`${BASE_URL}/userfunction/${userId}/uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Fetch updated user profile after successful upload
      await fetchProfile();

      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image. Please try again later.');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update Redux state
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    navigate('/login');
  };
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className='profilebgcolor'>
        <br/>
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-image">
              {profileImage ? (
                <img
                  src={profileImage}
                  style={{ width: '200px', height: '200px', borderRadius: '100px'}}
                  alt="User"
                />
              ) : (
                <p>No profile image available</p>
              )}
              <input type="file" onChange={handleFileChange} />
              <button className="profile-button" id="profile-button" onClick={handleUpload}>Upload Photo</button>
            </div>
            <div className="profile-info">
              <h4>Full Name: {user ? user.firstName : ''}&nbsp;{user ? user.lastName : ''}</h4>
              <p>Age: {user ? user.age : ''}</p>
              <p>Gender: {user ? user.gender : ''}</p>
              <p>Email: {user ? user.emailId : ''}</p>
              <p>Phone: {user ? user.mobile : ''}</p>
              <button className="profile-button1" id="profile-button1" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <h2>Settings</h2>
            </div>
            <div className="profile-section">
              <br/>
              <UpdateUserDetails/><ChangePassword/><DeleteUser/>
              <h2>
                <Link to="/review">Give Your Review</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;




/*
*/