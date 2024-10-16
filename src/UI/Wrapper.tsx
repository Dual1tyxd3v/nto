import styled from 'styled-components';

type WrapperProps = {
  $isColumn?: boolean;
  $isCentered?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  flex-direction: ${(props) => (props.$isColumn ? 'column' : 'row')};
  ${(props) =>
    props.$isCentered
      ? `align-items: center;
  justify-content: center;`
      : ''}
`;
Wrapper.defaultProps = {
  $isColumn: false,
  $isCentered: true,
};
