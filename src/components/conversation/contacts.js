import React, { useState, useEffect } from "react";

import { Chat } from "../chat";
import firebase from "../../utils/config";
import { NotFound } from "../notFound";

function useContacts(userId) {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    if (userId) {
      firebase
        .firestore()
        .collection("contatos")
        .doc(userId)
        .collection("pessoas")
        .onSnapshot(snapshot => {
          const newContact = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setContacts(newContact);
        });
    }
  }, [userId]);

  return contacts;
}

export default function ContactsList(props) {
  const { userId, handleClick } = props;
  const contacts = useContacts(userId);

  return (
    <div>
      { contacts.length > 0 ? (
        contacts.map(contact => (
        <div key={contact.id} onClick={() => handleClick(contact.id)}>
            <Chat data={contact} />
        </div>
      ))
      ) : (
        <NotFound conv={false} />
      )}
    </div>
  );
}
