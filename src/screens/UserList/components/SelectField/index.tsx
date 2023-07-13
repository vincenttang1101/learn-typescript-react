import { memo } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  onFilteredClick: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const SelectField = memo(({ onFilteredClick }: Props) => {
  return (
    <Form.Select onChange={onFilteredClick}>
      <option value="">Select field to sort</option>
      <option value="id">Id</option>
      <option value="firstName">First Name</option>
      <option value="lastName">Last Name</option>
      <option value="email">Email</option>
      <option value="birthday">Birthday</option>
      <option value="salary">Salary</option>
    </Form.Select>
  );
});
