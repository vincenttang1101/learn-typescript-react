import React, { memo } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
export const Search = memo(({ onInputChange }: Props) => {
  return <Form.Control type="text" placeholder="Search" onChange={onInputChange} />;
});
