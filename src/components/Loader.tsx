import styled from 'styled-components';
import { PopupWrapper } from '../UI/PopupWrapper';
import img from '../assets/img/loader.gif';

const Image = styled.img`
  width: 30rem;
  height: 30rem;
`

export default function Loader() {
  return (
    <PopupWrapper>
      <Image src={img} />
    </PopupWrapper>
  );
}
