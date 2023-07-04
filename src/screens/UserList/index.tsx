import React, { useState } from 'react';
import './styles.css';
import rawUsers from '../../data/users.json';
import { handleFilteredUsers, handleSearchedUsers, handleUsersIndexRange } from '../../utils';
import { Search, SelectField, UserTable, Paginate } from './components';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUsers, setCurrentUsers] = useState(rawUsers);
  const [displayedUsers, setDisplayedUsers] = useState(rawUsers.slice(0, 10));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    const searchedUsers = handleSearchedUsers(rawUsers, query);
    setCurrentUsers(searchedUsers);
    setDisplayedUsers(searchedUsers.slice(0, 10));
  };

  const handleFilteredClick = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const type = e.target.value;
    const filteredUsers = handleFilteredUsers(rawUsers, currentUsers, type);
    setCurrentUsers(filteredUsers);
    setDisplayedUsers(filteredUsers.slice(0, 10));
  };

  const handlePaginatedClick = (type: string): void => {
    const [newPage, newUsersPerPage] = handleUsersIndexRange(type, currentPage, currentUsers);
    setCurrentPage(newPage);
    setDisplayedUsers(newUsersPerPage);
  };

  return (
    <div className="container__userlist">
      <h2>User List</h2>
      <Search onInputChange={handleSearchChange} />
      <SelectField onFilteredClick={handleFilteredClick} />
      <UserTable
        displayedUsers={displayedUsers}
        columns={['Id', 'First Name', 'Last Name', 'Email', 'Gender', 'Birthday', 'Salary', 'Phone']}
      />
      <Paginate
        onPaginateClick={handlePaginatedClick}
        isDisablePrev={currentPage === 1}
        isDisableNext={Math.ceil(currentUsers.length / 10) === currentPage}
      />
    </div>
  );
}
