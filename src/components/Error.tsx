import styled from 'styled-components';
import { PopupWrapper } from '../UI/PopupWrapper';
import { Button } from '../UI/Button';

const Content = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 15px;
`;
const Message = styled.p`
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

type Props = {
  message: string;
  clear: () => void;
};

export default function Error({ message, clear }: Props) {
  return (
    <PopupWrapper>
      <Content>
        <Message>{message}</Message>
        <Button onClick={clear} $borderColor="#38363b" $isCentered $small>
          Ok
        </Button>
      </Content>
    </PopupWrapper>
  );
}
