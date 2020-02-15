import React from 'react';
import { Container } from './list.styles';

type ListProps = {
  children: JSX.Element | JSX.Element[]
}

export const List = ({children}: ListProps) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
