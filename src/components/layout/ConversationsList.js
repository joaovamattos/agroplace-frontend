import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import firebase from "../../utils/config";

function useConversations(userId) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    if (userId) {
      firebase
        .firestore()
        .collection("conversas")
        .doc(userId)
        .collection("contatos")
        .onSnapshot(snapshot => {
          const newConv = snapshot.docs
            .filter(c => c.data().idUsuario)
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
          setConversations(newConv);
        });
    }
  }, [userId]);

  return conversations;
}

export default function ConversationsList(props) {
  const { userId, handleItemClick } = props;
  const conversations = useConversations(userId);

  const handleClose = () => {
    this.setState({ anchorEl: null });
  };

  return conversations && conversations.length > 0 ? (
    conversations.slice(0, 3).map(conv => {
      return (
        <Link
          key={conv.id}
          to={{
            pathname: "/messages",
            state: {
              conv
            }
          }}
          style={{ color: "#161616" }}
        >
          <MenuItem
            onClick={() => {
              handleItemClick(conv.id);
            }}
          >
            <img
              src={conv.urlImagem}
              alt="Mensagem"
              width={45}
              height={45}
              style={{ borderRadius: "50%", marginRight: 10 }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1">{conv.nome}</Typography>
              <Typography variant="body2">{conv.mensagem}</Typography>
            </div>
            {!conv.visualizada ? (
              <BookmarkIcon color="primary" style={{ alignSelf: "start" }} />
            ) : null}
          </MenuItem>
        </Link>
      );
    })
  ) : (
    <MenuItem onClick={handleClose}>Você ainda não possui mensagens</MenuItem>
  );
}
