import React from "react";
import { useSelector } from "react-redux";
import { Container, Message } from "./styles";

export const Messages = ({ data }) => {
  console.log(data);

  const id = useSelector(state => state.user.id);
  return (
    <Container>
      {data.map(m =>
        id === m.idUsuario ? (
          <Message key={m.id} right>
            {m.mensagem}
          </Message>
        ) : (
          <Message key={m.id} left>
            {m.mensagem}
          </Message>
        )
      )}
    </Container>
  );
};
