import React, { useContext, Fragment } from 'react';

import { dataContext } from '../../contexts/data-context'

import Item from '../item'

import { List, ListItem } from './inner-list.styles'

type Datum = {
  id: number;
  parent: number;
  isDirectory: boolean;
  label: string;
};

type InnerListProps = {
  parentId: number;
}

export const InnerList = ({ parentId }: InnerListProps) => {
  const { data } = useContext(dataContext)
  const getItemsByParentId = (id: number): Array<Datum> => data.filter(({ parent }: Datum) => parent === id)
  const items = getItemsByParentId(parentId)

  return (
    <List>
      {items.sort((a, b) => a.isDirectory && !b.isDirectory ? 1 : -1).map(({ id, isDirectory, label }) => (
        <Fragment key={id}>
          <Item id={id} isDirectory={isDirectory}>{label}</Item>
          {isDirectory && (
            <ListItem>
              <InnerList parentId={id} />
            </ListItem>
          )}
        </Fragment>
      ))}
    </List>
  )
}
