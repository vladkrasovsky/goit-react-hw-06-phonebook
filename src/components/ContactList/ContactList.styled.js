import styled from 'styled-components';

export const List = styled.ol`
  padding-left: 15px;

  > li:not(:last-child) {
    margin-bottom: 5px;
  }
`;
