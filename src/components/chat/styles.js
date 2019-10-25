import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding-bottom: 5px;
  padding-left: 10px;
  overflow: hidden !important;
  transition: .1s;
 
  @media (max-width: 414px) {
    padding-left: 8px;
  }

  &:hover{
    background-color: #149b519d;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const UserName = styled.p`
  font-size: 1em;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
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
