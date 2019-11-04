import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Profile,
  RecipientImage,
  RecipientName,
  NoConversationYet
} from "./styles";
// MUI Stuff
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from "@material-ui/icons/Close";
import Typing from "../../images/typing.svg";
import { addContact } from "../../redux/actions/userActions";
import MessagesSkeleton from "../../utils/skeletons/MessagesSkeleton";
import MessageForm from "../messageForm";
import BoxMessages from "../messagesList";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export const MessagesPanel = ({ data }) => {
  const classes = useStyles();
  const loadingMessages = useSelector(state => state.user.loadingMessages);
  const userId = useSelector(state => state.user.id);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

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
          {loadingMessages && !userId ? (
            <MessagesSkeleton />
          ) : (
            <BoxMessages userId={userId} recipient={data.id} />
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