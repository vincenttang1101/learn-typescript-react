import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
export const Search = ({ searchTerm, onInputChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm === '') {
      inputRef.current!.value = '';
      inputRef.current!.focus();
    }
  }, [searchTerm]);

  return <Form.Control ref={inputRef} type="text" placeholder="Search" onChange={onInputChange} />;
};
