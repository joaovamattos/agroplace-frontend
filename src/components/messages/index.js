import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, Message } from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

export const Messages = ({ data }) => {
  console.log(data);

  const id = useSelector(state => state.user.id);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [data]);

  return (
    <Container>
      {data.reverse().map(m =>
        id === m.idUsuario ? (
          <Message key={m.dataCriacao} right>
            {m.mensagem}
            {m.visualizada ? <DoneAllIcon /> : <DoneIcon />}
          </Message>
        ) : (
          <Message key={m.dataCriacao} left>
            {m.mensagem}
          </Message>
        )
      )}
      <div ref={messagesEndRef} />
    </Container>
  );
};
