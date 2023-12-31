import { UserType } from '../../../../../models';
import dayjs from 'dayjs';

interface Props {
  user: UserType;
}

export function UserItem({ user }: Props) {
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
