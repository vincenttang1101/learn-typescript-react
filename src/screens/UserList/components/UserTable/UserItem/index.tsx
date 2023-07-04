import React from 'react';
import { UserType } from '../../../../../models';
import dayjs from 'dayjs';

interface Props {
  user: UserType;
}

export function UserItem({ user }: Props) {
  // const handleBirth = (birth: string) => {
  //   const date = new Date(birth);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear().toString();
  //   return `${day}/${month}/${year}`;
  // };

  const handlePhone = (phone: string) => {
    const formattedPhone = '+(84)' + phone.replace(/-/g, '');
    return formattedPhone;
  };

  return (
    <>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
      <td>{dayjs(user.birthday).format('DD/MM/YYYY')}</td>
      <td>{user.salary}</td>
      <td>{handlePhone(user.phone)}</td>
    </>
  );
}
