import React from "react";
import { Link } from "react-router-dom";

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
    <Link to={`/messages/${data.id}`}>
      <Container>
        <div style={{display: 'flex'}}>
          <UserImage src={data.urlImagem} alt={`Foto de ${data.nome}`} />
          <Description>
            <UserName>{data.nome}</UserName>
            {data.mensagem ? <LastMessage>{data.mensagem}</LastMessage> : null}          
          </Description>
        </div>
        {data.mensagem ? (
          data.visualizada ? null : <BookmarkIcon style={{color: '#eee', marginRight: 20 }} />
          ) : null}
      </Container>
    </Link>
  ) : (
    <p>Nenhuma conversa encontrada!</p>
  );
};
