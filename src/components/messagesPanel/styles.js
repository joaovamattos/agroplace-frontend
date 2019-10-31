import styled from "styled-components";

export const Container = styled.div`
  width: 100%;  
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const Profile = styled.div`
  width: 100%;
  height: 60px;
  background-color: #eee;
  padding: 0.5em 1em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

export const RecipientImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 18px;
`;

export const RecipientName = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-left: 10px;
`;

export const NoConversationYet = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fafafa;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
