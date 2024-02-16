import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminHome = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }
        const response = await fetch(`${BASE_URL}/userfunction/adminGetDetails`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserDetails(data);
          setFilteredUserDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterUserDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredUserDetails(userDetails);
  };

  const filterUserDetails = (term, category) => {
    const filteredDetails = userDetails.filter(user => {
      const userValue = user[category].toLowerCase();
      return userValue.includes(term.toLowerCase());
    });
    setFilteredUserDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminhome' className='adminhomecontainer'>
        <h1 id='adminhome'>User Details</h1>
        <div id='adminhome1' className="search-container">
          <label htmlFor="searchCategory" id='adminhome'>Search Category: </label>
          <select
            id='adminhome'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminhome' value="select">Select</option>
            <option id='adminhome' value="firstName">First Name</option>
            <option id='adminhome' value="lastName">Last Name</option>
            <option id='adminhome' value="emailId">Email ID</option>
          </select>
          <label id='adminhome' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminhome'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminhome' onClick={handleSearchClick}>Search</button>
          <button id='adminhome' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminhometablecontainer'>
          <table id='adminhome'>
            <thead id='adminhome'>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Email ID</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map(user => (
                <tr key={user.userid}>
                  <td>{user.userid}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.emailId}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHome;



/*

*/