import styled from 'styled-components';
import { ObjectType } from '../types';
import { TiInputCheckedOutline } from 'react-icons/ti';
import { FaRegClock } from 'react-icons/fa';
import { formatTotal, getDate } from '../utils';
import { Button } from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../config';

const Wrapper = styled.div`
  border-radius: 15px;
  backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  padding: 1rem 1.2rem;
  width: 39.4rem;
  cursor: pointer;
  transition: transform 0.2s ease-in, box-shadow 0.2s ease-in;

  &:hover {
    box-shadow: var(--shadow);
    transform: translateY(-3px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  border-radius: 15px;
  height: 26rem;
  object-fit: cover;
`;

const Location = styled.p`
  position: absolute;
  backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  bottom: 1rem;
  left: 1rem;
  z-index: 2;
`;

type IconProps = {
  $small?: boolean;
};
const Icon = styled.div<IconProps>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  padding: 0.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

type InfoBlockProps = {
  $isLower?: boolean;
};
const InfoBlock = styled.div<InfoBlockProps>`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  margin-bottom: 2rem;

  & span {
    color: var(--color-${(props) => (props.$isLower ? 'error' : 'success')});
  }
`;

type CardProps = {
  data: ObjectType;
};

export default function Card({ data }: CardProps) {
  const navigate = useNavigate();

  const { id, name, img, location, dateStarted, dateEnded, price, profit } = data;
  return (
    <Wrapper>
      <ImageContainer>
        <Image src={img as string} alt={name} referrerPolicy="no-referrer" loading="lazy" />
        <Location>{location}</Location>
        <Icon>
          {dateEnded ? (
            <TiInputCheckedOutline color="#84cc16" />
          ) : (
            <FaRegClock color="#facc15" style={{ width: '80%', height: '80%' }} />
          )}
        </Icon>
      </ImageContainer>
      <Name>{name}</Name>
      <InfoBlock $isLower={profit < 0}>
        <div>
          <p>{getDate(dateStarted)}</p>
          <p>{dateEnded ? getDate(dateEnded) : 'В работе'}</p>
        </div>
        <div>
          <p>{formatTotal(price)}</p>
          <p>
            <span>{formatTotal(profit)}</span>
          </p>
        </div>
      </InfoBlock>
      <Button
        $small
        $isCentered
        $borderColor="#241b2e"
        title={`${AppRoute.OBJECT}/${id}`}
        onClick={() => navigate(`${AppRoute.OBJECT}/${id}`)}
      >
        Редактировать
      </Button>
    </Wrapper>
  );
}
