import React from "react";

import { Messages } from "../messages";
import {
  Container,
  Profile,
  RecipientImage,
  RecipientName,
  MessageForm,
  MessageInput,
  SendMessage,
  NoConversationYet
} from "./styles";
import Typing from '../../images/typing.svg';

export const MessagesPanel = ({ data }) => {
  return (
    <Container>
      {data ? (
        <>
          <Profile>
            <RecipientImage
              src="https://firebasestorage.googleapis.com/v0/b/agroplace-project.appspot.com/o/281797789847.jpg?alt=media"
              alt="recipent profile pic"
            />
            <RecipientName>{data}</RecipientName>
          </Profile>
          <Messages data={["oi", "olá", "tudo bem?", "sharingan!"]} />
          <MessageForm>
            <MessageInput placeholder="Digite uma mensagem..." />
            <SendMessage />
          </MessageForm>
        </>
      ) : (
        <NoConversationYet>
        <img src={Typing} alt="Ícone de mensagens" width={'50%'}/>
            <p style={{margin: '1em'}}>Você não iniciou nenhuma conversa ainda</p>
        </NoConversationYet>
      )}
    </Container>
  );
};
