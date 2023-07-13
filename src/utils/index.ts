import { UserType } from '../models';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const handleFilteredUsers = (rawUsers: UserType[], currentUsers: UserType[], type: string): UserType[] => {
  const handleSortEmail = (email: string) => {
    return email.split('@')[1].charAt(0);
  };

  let filteredUsers = [...currentUsers];
  switch (type) {
    case 'id':
      filteredUsers.sort((a, b) => a.id - b.id);
      break;
    case 'firstName':
      filteredUsers.sort((a, b) => a.firstName.charAt(0).localeCompare(b.firstName.charAt(0)));
      break;
    case 'lastName':
      filteredUsers.sort((a, b) => a.lastName.charAt(0).localeCompare(b.lastName.charAt(0)));
      break;
    case 'email':
      filteredUsers.sort((a, b) =>
        handleSortEmail(a.email).toLowerCase().localeCompare(handleSortEmail(b.email).toLowerCase())
      );
      break;
    case 'birthday':
      filteredUsers.sort((a, b) => new Date(a.birthday).valueOf() - dayjs(b.birthday).valueOf());
      break;
    case 'salary':
      filteredUsers.sort((a, b) => a.salary - b.salary);
      break;
    default:
      return rawUsers;
  }

  return filteredUsers;
};

export const handleSearchedUsers = (rawUsers: UserType[], query: string, filteredType: keyof UserType): UserType[] => {
  dayjs.extend(customParseFormat);
  const currentUsersClone = [...rawUsers];
  const searchedUsers = currentUsersClone
    .filter((user) => {
      query = query.toLowerCase();

      return (
        user.id.toString() === query ||
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.salary.toString() === query ||
        user.phone.toString() === query
      );
    })
    .sort((a, b) => {
      if (a[filteredType] < b[filteredType]) {
        return -1;
      }
      if (a[filteredType] > b[filteredType]) {
        return 1;
      }
      return 0;
    });
  return searchedUsers;
};

export const handleUsersIndexRange = (
  type: string,
  usersPerpage: number,
  currentPage: number,
  currentUsers: UserType[]
): [number, UserType[]] => {
  const indexOfLastUser = type === 'next' ? (currentPage + 1) * usersPerpage : (currentPage - 1) * usersPerpage;
  const indexOfFirstUser = indexOfLastUser - usersPerpage;

  const newPage = type === 'next' ? currentPage + 1 : currentPage - 1;

  const newUsersPerPage = currentUsers.slice(indexOfFirstUser, indexOfLastUser);
  return [newPage, newUsersPerPage];
};
