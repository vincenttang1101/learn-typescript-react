import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
export const Search = ({ onInputChange }: Props) => {
  return <Form.Control type="text" placeholder="Search" onChange={onInputChange} />;
};
