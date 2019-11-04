import React, { useState, useEffect } from "react";

import MessageIcon from "@material-ui/icons/Message";
import Badge from "@material-ui/core/Badge";

import firebase from "../../utils/config";

function useConversations(userId) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("conversas")
      .doc(userId)
      .collection("contatos")
      .onSnapshot(snapshot => {
        const newConv = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setConversations(newConv);
      });
  }, [userId]);

  return conversations;
}

export default function ConversationsList(props) {
  const { userId } = props;
  const conversations = useConversations(userId);

  return conversations && conversations.length > 0 ? (
    conversations.filter(conv => conv.visualizada === false).length > 0 ? (
      <Badge
        badgeContent={
          conversations.filter(conv => conv.visualizada === false).length
        }
        color="secondary"
      >
        <MessageIcon style={{ color: "#fff" }} />
      </Badge>
    ) : (
      <MessageIcon style={{ color: "#fff" }} />
    )
  ) : (
    <MessageIcon style={{ color: "#fff" }} />
  );
}
