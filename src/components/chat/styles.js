import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 5px;
  margin-left: 10px;
  overflow: hidden !important;

  @media (max-width: 414px) {
    margin-left: 8px;
    max-width: 60px;
  }

`;
export const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  transition: 0.5s;

  @media (max-width: 414px) {
    width: 30px;
    height: 30px;
  }
`;
export const Description = styled.div`
  margin-left: 10px;
`;
export const UserName = styled.p`
  font-size: 1em;
  font-weight: 600;
  color: #fff;
  margin: 0;
  padding: 0;
`;
export const LastMessage = styled.p`
  font-size: 0.8em;
  color: #e3fbe3;
  white-space: nowrap;
  margin: 0;
  padding: 0;
`;
