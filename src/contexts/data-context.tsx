import React, { useState, createContext } from 'react'

type Datum = {
  id: number;
  parent: number;
  isDirectory: boolean;
  label: string;
};

const defaultData: Datum[] = [
  {
    label: 'Everything',
    isDirectory: true,
    id: 0,
    parent: -1,
  },
]

type DataContextProps = {
  data: Datum[];
  saveItem: Function;
  deleteItem: Function;
  addItem: Function;
}

export const dataContext = createContext<DataContextProps>({
  data: [],
  saveItem: () => {},
  deleteItem: () => {},
  addItem: () => {},
})

type DataProviderProps = {
  children: JSX.Element;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState(defaultData)

  const getItemIndexById = (id: number) => data.findIndex(((datum) => datum.id === id));

  const saveItem = (id: number, label: string) => {
    const index = getItemIndexById(id)
    data[index].label = label
    setData([...data])
  }
  const deleteItem = (id: number) => {
    const index = getItemIndexById(id)
    data.splice(index, 1)

    data.forEach((datum, childIndex) => {
      if (datum.parent === id) {
        data.splice(childIndex, 1)
      }
    })

    setData([...data])
  }
  const addItem = (parentId: number, isDirectory: boolean = false) => {
    data.push({
      label: '',
      isDirectory,
      id: Math.floor(Math.random() * 10000),
      parent: parentId,
    })

    setData([...data])
  }

  const value: DataContextProps = {
    data,
    saveItem,
    deleteItem,
    addItem,
  }

  return (
    <dataContext.Provider value={value}>
      { children }
    </dataContext.Provider>
  )
}