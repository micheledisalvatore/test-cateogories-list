import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Item } from '../item';
import { dataContext} from '../../../contexts/data-context'

test('renders the basic component', () => {
  const { container } = render(<dataContext.Provider value={{
    saveItem: jest.fn(),
    deleteItem: jest.fn(),
    addItem: jest.fn(),
  }}><Item id={0} children="foo" isDirectory={false} /></dataContext.Provider>);
  expect(container).toMatchSnapshot()
});

test('emulates the editing feature', () => {
  const saveItem = jest.fn()
  const deleteItem = jest.fn()
  const addItem = jest.fn()

  render(<dataContext.Provider value={{
    saveItem,
    deleteItem,
    addItem,
  }}><Item id={0} children="foo" isDirectory={false} /></dataContext.Provider>);
  expect(screen.queryByTestId('label')).toBeInTheDocument()

  fireEvent.click(screen.queryByTestId('edit'))
  expect(screen.queryByTestId('label')).not.toBeInTheDocument()

  fireEvent.change(screen.queryByTestId('input'), { value: 'foo' })
  fireEvent.submit(screen.queryByTestId('form'))
  expect(saveItem).toBeCalledWith(0, 'foo')
});

test('emulates adding an item and category', () => {
  const saveItem = jest.fn()
  const deleteItem = jest.fn()
  const addItem = jest.fn()

  render(<dataContext.Provider value={{
    saveItem,
    deleteItem,
    addItem,
  }}><Item id={0} children="foo" isDirectory={true} /></dataContext.Provider>);
  expect(screen.queryByTestId('label')).toBeInTheDocument()

  fireEvent.click(screen.queryByTestId('add-item'))
  expect(addItem).toBeCalledWith(0, false)

  fireEvent.click(screen.queryByTestId('add-category'))
  expect(addItem).toBeCalledWith(0, true)
});

test('emulates deleting an item', () => {
  const saveItem = jest.fn()
  const deleteItem = jest.fn()
  const addItem = jest.fn()

  render(<dataContext.Provider value={{
    saveItem,
    deleteItem,
    addItem,
  }}><Item id={0} children="foo" isDirectory={true} /></dataContext.Provider>);
  expect(screen.queryByTestId('label')).toBeInTheDocument()

  fireEvent.click(screen.queryByTestId('delete'))
  expect(deleteItem).toBeCalledWith(0)
});
