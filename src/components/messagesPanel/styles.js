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

export const MessageForm = styled.form`
  width: 100%;
  height: 65px;
  display: flex;
  background-color: #eee;
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const MessageInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 15px;
  padding: 2px 15px;
  outline: none;
  ::placeholder {
    color: #999999;
  }
`;

export const SendMessage = styled.button`
  width: 40px;
  height: 40px;
  background-color: #20ce6c;
  border-radius: 50%;
  border: none;
  margin-left: 10px;
  color: #e3fbe3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #149b519d;
  }
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
