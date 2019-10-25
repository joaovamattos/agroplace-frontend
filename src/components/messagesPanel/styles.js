import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Profile = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  background-color: #eee;
  padding: .5em 1em;
  display: flex;
  align-items: center;
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
  min-width: 90%;
  height: 50px;
  display: flex;
  background-color: #eee;
  padding: .5em 1em;
  display: flex;
  align-items: center;
`;

export const MessageInput = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 15px;
  padding: 2px 15px;
  outline: none;
  ::placeholder {
    color: #999999;
  }
`;

export const SendMessage = styled.button`
  width: 36px;
  height: 36px;
  background-color: #20ce6c;
  border-radius: 18px;
  border: none;
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