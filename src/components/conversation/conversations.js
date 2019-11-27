import React, { useState, useEffect } from "react";

import { Chat } from "../chat";
import firebase from "../../utils/config";
import { NotFound } from "../notFound";

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
          const newConv = snapshot.docs.map(doc => ({
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
  const { userId, handleClick } = props;
  const conversations = useConversations(userId);

  return (
    <div>
      { conversations.length > 0 ? (
        conversations.map(conv => (
          <div key={conv.id} onClick={() => handleClick(conv.id)}>
            <Chat data={conv} />
          </div>
        ))
      ) : (
        <NotFound conv={true} />
      )}
    </div>
  );
}
