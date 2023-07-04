import React, { memo, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface Props {
  onTodoAddClick: (title: string) => void;
}

export const AddTodo = memo(({ onTodoAddClick }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = (): void => {
    const newTitle = inputRef.current?.value || '';
    if (!newTitle) {
      alert('Please enter value!');
    } else {
      onTodoAddClick(newTitle);
      inputRef.current!.value = '';
      inputRef.current!.focus();
    }
  };

  return (
    <>
      <Form.Control className="w-25" type="text" placeholder="Enter title" name="title" ref={inputRef} />
      <Button className="w-25" variant="primary" onClick={handleAddTodo}>
        Add
      </Button>
    </>
  );
});
