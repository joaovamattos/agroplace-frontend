import React from "react";

import {
  Container,
  UserImage,
  Description,
  UserName,
  LastMessage
} from "./styles";

export const Chat = ({ data }) => {
  return data ? (
    <Container>
      <UserImage src={data.urlImagem} alt={`Foto de ${data.nome}`} />
      <Description>
        <UserName>{data.nome}</UserName>
        <LastMessage>{data.mensagem}</LastMessage>
      </Description>
    </Container>
  ) : (
    <p>Nenhuma conversa encontrada!</p>
  );
};
