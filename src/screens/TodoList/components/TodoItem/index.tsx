import { useRef, useState } from 'react';

import { TodoType } from '../../../../types';
import './styles.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface Props {
  todo: TodoType;
  onActiveTodoClick: (id: number) => void;
  onEditTodoClick: (id: number, title: string) => void;
  onRemoveTodoClick: (id: number) => void;
}

export function TodoItem({ todo, onActiveTodoClick, onEditTodoClick, onRemoveTodoClick }: Props) {
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleEditSave = (): void => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      const newTitle = inputRef.current!.value;
      onEditTodoClick(todo.id, newTitle);
    }
  };

  const handleToggleRemoveCancel = (id: number): void => {
    if (!isEditing) {
      onRemoveTodoClick(id);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="todo__item">
      {!isEditing ? (
        <p className={todo.isCompleted ? 'actived' : undefined} onClick={() => onActiveTodoClick(todo.id)}>
          {todo.title}
        </p>
      ) : (
        <Form.Control type="text" name="title" defaultValue={todo.title} ref={inputRef} />
      )}

      <Button variant={!isEditing ? 'warning' : 'success'} onClick={handleToggleEditSave}>
        {!isEditing ? 'Edit' : 'Save'}
      </Button>
      <Button variant="danger" onClick={() => handleToggleRemoveCancel(todo.id)}>
        {!isEditing ? 'Remove' : 'Cancel'}
      </Button>
    </div>
  );
}
