import React, { useRef, useState, useEffect } from "react";

import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import firebase from "../../utils/config";
import { BoxMessage, Message } from "./styles";

function useMessages(userId, recipient) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("mensagens")
      .doc(userId)
      .collection(recipient)
      .orderBy("dataCriacao", "asc")
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(newMessages);
      });
  }, [userId, recipient]);

  return messages;
}

export default function MessagesList(props) {
  const { userId, recipient } = props;
  const messages = useMessages(userId, recipient);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <BoxMessage>
      {messages.map(m =>
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
  );
}
