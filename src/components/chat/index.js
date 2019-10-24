import React from "react";

import {
  Container,
  UserImage,
  Description,
  UserName,
  LastMessage
} from "./styles";
import BookmarkIcon from "@material-ui/icons/Bookmark";

export const Chat = ({ data }) => {
  return data ? (
    <Container>
      <div style={{display: 'flex'}}>
        <UserImage src={data.urlImagem} alt={`Foto de ${data.nome}`} />
        <Description>
          <UserName>{data.nome}</UserName>
          <LastMessage>{data.mensagem}</LastMessage>
        </Description>
      </div>
      {!data.visualizada ? (<BookmarkIcon style={{color: '#eee' }} />) : (null)}
    </Container>
  ) : (
    <p>Nenhuma conversa encontrada!</p>
  );
};
