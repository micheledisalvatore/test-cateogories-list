import styled, { css } from 'styled-components';

type ContainerProps = {
  readonly isDirectory: boolean;
};

export const Container = styled.li`
  list-style: none;
`;

export const Form = styled.form<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ isDirectory }) => isDirectory && css`
    &::before {
      content: ' ';
      display: inline-block;

      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px solid currentColor;

      vertical-align: middle;
      margin-right: .7rem;
      transition: transform .2s ease-out;

      transform: rotate(90deg);
    }
  `}
`

export const Label = styled.div`
  font-size: 1rem;
  flex-grow: 1;
  text-align: left;
`;

export const Input = styled(Label)`
  border: none;
  padding: 0;
`;

export const Icons = styled.div``;
export const Icon = styled.button`
  background: none;
  border: none;
  margin: 0.2rem;
  cursor: pointer;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover svg {
    fill: red;
  }
`;
