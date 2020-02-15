import React, { useRef, useState, useEffect, useContext } from 'react';

import { dataContext } from '../../contexts/data-context'

import { Container, Label, Input, Icons, Icon, Form } from './item.styles';
import EditIcon from './edit-icon'
import AddIcon from './add-icon'
import DirectoryIcon from './directory-icon'
import DeleteIcon from './delete-icon'
import SaveIcon from './save-icon'

type ItemProps = {
  id: number;
  isDirectory: boolean;
  children: string;
}

export const Item = ({ id, children, isDirectory }: ItemProps) => {
  const [isEditing, setEditingMode] = useState(children === '')
  const input = useRef<HTMLInputElement>(null)
  const { saveItem, deleteItem, addItem } = useContext(dataContext)

  const toggleEdit = () => {
    setEditingMode(!isEditing)
  }

  useEffect(() => {
    if (isEditing && input && input.current) {
      input.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    let value: string = ''
    if (isEditing && input && input.current) {
      ({ value } = input.current)
    }
    saveItem(id, value)
    toggleEdit()
  }

  const handleDelete = () => {
    deleteItem(id)
  }

  const handleAdd = (isAddingDirectory: boolean) => () => {
    addItem(id, isAddingDirectory)
  }

  return (
    <Container>
      <Form isDirectory={isDirectory} onSubmit={handleSave} data-testid="form">
        {!isEditing && (
          <Label data-testid="label">
            { children }
          </Label>
        )}
        {isEditing && <Input as="input" type="text" defaultValue={children} ref={input} data-testid="input" />}
        <Icons>
          {!isEditing && (<Icon type="button" onClick={toggleEdit} data-testid="edit"><EditIcon /></Icon>)}
          {isEditing && (<Icon type="submit" onClick={handleSave} data-testid="save"><SaveIcon /></Icon>)}
          {isDirectory && (<Icon type="button" onClick={handleAdd(false)} data-testid="add-item"><AddIcon /></Icon>)}
          {isDirectory && (<Icon type="button" onClick={handleAdd(true)} data-testid="add-category"><DirectoryIcon /></Icon>)}
          <Icon type="button" onClick={handleDelete} data-testid="delete"><DeleteIcon /></Icon>
        </Icons>
      </Form>
    </Container>
  )
}
