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
import { getMessages, sendMessage, addContact } from "../../redux/actions/userActions";
import Typing from "../../images/typing.svg";
import MessagesSkeleton from "../../utils/skeletons/MessagesSkeleton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export const MessagesPanel = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loadingMessages = useSelector(state => state.user.loadingMessages);
  const userId = useSelector(state => state.user.id);
  const messages = useSelector(state => state.user.messages);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getMessages(data.id));
  }, [dispatch, data]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  const handleContact = (data) => {
    const id = data.id;
    dispatch(addContact(id));
    handleClick();
  }

    return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
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
          </IconButton>,
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
              <IconButton onClick={()=> handleContact(data)}>
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
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
              <SendIcon />
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
