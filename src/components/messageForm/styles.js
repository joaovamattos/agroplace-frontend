import styled from "styled-components";

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