import { Table } from 'react-bootstrap';
import { UserItem } from './UserItem';
import { UserType } from '../../../../models';

interface Props {
  displayedUsers: UserType[];
  columns: string[];
}

export function UserTable({ displayedUsers, columns }: Props) {
  return (
    <Table hover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(displayedUsers.length > 0 &&
          displayedUsers.map((user) => (
            <tr key={user.id}>
              <UserItem user={user} />
            </tr>
          ))) || (
          <tr>
            <td colSpan={columns.length}>Not found user</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
