import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageForm, MessageInput, SendMessage } from "./styles";
import SendIcon from "@material-ui/icons/Send";
import { sendMessage } from "../../redux/actions/userActions";

export default ({ data }) => {
  const userId = useSelector(state => state.user.id);
  const dispatch = useDispatch();
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
    setMessage("");
  };

  return (
    <MessageForm onSubmit={handleSubmit}>
      <MessageInput
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Digite uma mensagem..."
        required
      />
      <SendMessage>
        <SendIcon />
      </SendMessage>
    </MessageForm>
  );
};
