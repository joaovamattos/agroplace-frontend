import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Profile,
  RecipientImage,
  RecipientName,
  NoConversationYet,
  BoxMessage,
  Message
} from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../redux/actions/userActions";
import Typing from "../../images/typing.svg";
import MessagesSkeleton from "../../utils/skeletons/MessagesSkeleton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MessageForm from "../messageForm";
import firebase from "../../utils/config";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export const MessagesPanel = ({ data }) => {
  const classes = useStyles();
  const loadingMessages = useSelector(state => state.user.loadingMessages);
  const userId = useSelector(state => state.user.id);
  // const messages = useSelector(state => state.user.messages);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(scrollToBottom, [messages]);

    if (userId && data.id) {
      let m = [];
      firebase
        .firestore()
        .collection("mensagens")
        .doc(userId)
        .collection(data.id)
        .orderBy("dataCriacao", "desc")
        .onSnapshot(function(snapshot) {
          snapshot.docs.map(doc => {
            m.push(doc.data());
          });
          setMessages(m);
        });
    }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleContact = data => {
    const id = data.id;
    dispatch(addContact(id));
    handleClick();
  };

  return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Contato adicionado com sucesso!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
      {data.id ? (
        <>
          <Profile>
            <div>
              <RecipientImage
                src={data.urlImagem}
                alt={`Foto de perfil de ${data.nome}`}
              />
              <RecipientName>{data.nome}</RecipientName>
            </div>
            <Tooltip title="Adicionar contato" placement="top">
              <IconButton onClick={() => handleContact(data)}>
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </Profile>
          {loadingMessages ? (
            <MessagesSkeleton />
          ) : (
            <BoxMessage>
              {messages.reverse().map(m =>
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
          )}
          <MessageForm data={data} />
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
