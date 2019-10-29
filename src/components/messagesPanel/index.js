import React, { useEffect, useState } from "react";

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
import { useSelector, useDispatch } from "react-redux";
import { getMessages, sendMessage } from "../../redux/actions/userActions";
import Typing from "../../images/typing.svg";
import MessagesSkeleton from "../../utils/skeletons/MessagesSkeleton";
import SendIcon from "@material-ui/icons/Send";

export const MessagesPanel = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages(data.id));
  }, [dispatch, data]);

  const loadingMessages = useSelector(state => state.user.loadingMessages);
  const userId = useSelector(state => state.user.id);
  const messages = useSelector(state => state.user.messages);

  const [message, setMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const newMessage = {
      message,
      recipient: data.id,
      sender: userId,
      recipientName: data.nome,
      recipientImageUrl: data.urlImagem
    };
    dispatch(sendMessage(newMessage));
    setMessage('');
  };

  return (
    <Container>
      {data.id ? (
        <>
          <Profile>
            <RecipientImage
              src={data.urlImagem}
              alt={`Foto de perfil de ${data.nome}`}
            />
            <RecipientName>{data.nome}</RecipientName>
          </Profile>
          {loadingMessages ? (
            <MessagesSkeleton />
          ) : (
            <Messages data={messages} />
          )}
          <MessageForm onSubmit={handleSubmit}>
            <MessageInput
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
              required
            />
            <SendMessage>
              {" "}
              <SendIcon />{" "}
            </SendMessage>
          </MessageForm>
        </>
      ) : (
        <NoConversationYet>
          <img src={Typing} alt="Ícone de mensagens" width={"50%"} />
          <p style={{ margin: "1em" }}>
            Você não iniciou nenhuma conversa ainda
          </p>
        </NoConversationYet>
      )}
    </Container>
  );
};
