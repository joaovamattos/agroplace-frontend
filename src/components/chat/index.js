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
    data.identificadorUsuario || data.idUsuario ? (
      <Container>
        <div style={{ display: "flex" }}>
          <UserImage src={data.urlImagem} alt={`Foto de ${data.nome}`} />
          <Description>
            <UserName>{data.nome}</UserName>
            {data.mensagem ? <LastMessage>{data.mensagem}</LastMessage> : null}
          </Description>
        </div>
        {data.mensagem ? (
          data.visualizada ? null : (
            <BookmarkIcon style={{ color: "#eee", marginRight: 20 }} />
          )
        ) : null}
      </Container>
    ) : null
  ) : (
    <p>Nenhuma conversa encontrada!</p>
  );
};
