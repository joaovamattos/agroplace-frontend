import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, Message } from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

export const Messages = ({ data }) => {
  console.log(data);

  const id = useSelector(state => state.user.id);

  

  return (
    <BoxMessage>
      {data.reverse().map(m =>
        userId === m.idUsuario ? (
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
    </BoxMessage>
  );
};
