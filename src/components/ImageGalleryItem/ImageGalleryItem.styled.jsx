import styled from '@emotion/styled';

export const Item = styled.li`
  overflow: hidden;
  border-radius: 15px; 
  &:hover {
    box-shadow: 0px 0px 13px 10px rgba(0, 0, 0, 0.5);;
}
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.05);
    cursor: zoom-in;
  }
`;

