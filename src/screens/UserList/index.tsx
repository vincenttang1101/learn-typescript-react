import { useCallback, useState } from 'react';
import './styles.css';
import rawUsers from '../../data/users.json';
import { handleFilteredUsers, handleSearchedUsers, handleUsersIndexRange } from '../../utils';
import { Search, SelectField, UserTable, Paginate } from './components';

export default function UserList() {
  const [currentUsers, setCurrentUsers] = useState(rawUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState(rawUsers.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState('!');
  const [filteredType, setFilteredType] = useState<any>(); // Để fix lỗi filteredType: keyof UserType được truyền vào utils/index.ts

  const usersPerpage = 10;

  const handleSearchedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const query = e.target.value;

      const searchedUsers = handleSearchedUsers(rawUsers, query, filteredType);

      setCurrentPage(1);
      setCurrentUsers(searchedUsers);
      setDisplayedUsers(searchedUsers.slice(0, 10));
    },
    [filteredType]
  );

  const handleFilteredClick = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const type = e.target.value;
      const filteredUsers = handleFilteredUsers(rawUsers, currentUsers, type);

      type !== '' ? setSearchTerm('!') : setSearchTerm(''); // reset search-input

      setCurrentPage(1);
      setCurrentUsers(filteredUsers);
      setDisplayedUsers(filteredUsers.slice(0, 10));
      setFilteredType(type);
    },
    [currentUsers]
  );

  const handlePaginatedClick = useCallback(
    (type: string): void => {
      const [newPage, newUsersPerPage] = handleUsersIndexRange(type, usersPerpage, currentPage, currentUsers);
      setCurrentPage(newPage);
      setDisplayedUsers(newUsersPerPage);
    },
    [currentPage, currentUsers]
  );

  return (
    <div className="container__userlist">
      <h2>User List</h2>
      <Search searchTerm={searchTerm} onInputChange={handleSearchedChange} />
      <SelectField onFilteredClick={handleFilteredClick} />
      <UserTable
        displayedUsers={displayedUsers}
        columns={['Id', 'First Name', 'Last Name', 'Email', 'Gender', 'Birthday', 'Salary', 'Phone']}
      />
      <Paginate
        onPaginateClick={handlePaginatedClick}
        isDisablePrev={currentPage === 1}
        isDisableNext={currentUsers.length === 0 || Math.ceil(currentUsers.length / 10) === currentPage}
      />
    </div>
  );
}
