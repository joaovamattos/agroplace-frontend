import React from 'react'

import { Messages } from '../messages';
import { Container, Profile, RecipientImage, RecipientName, MessageForm, MessageInput, SendMessage } from './styles';

export const MessagesPanel = () => {
    return (
        <Container>
            <Profile>
                <RecipientImage src="https://firebasestorage.googleapis.com/v0/b/agroplace-project.appspot.com/o/281797789847.jpg?alt=media" alt="recipent profile pic"/>
                <RecipientName>Kakashi</RecipientName>
            </Profile>
            <Messages data={['oi', 'olá', 'tudo bem?', 'sharingan!']} />
            <MessageForm>
                <MessageInput placeholder="Digite uma mensagem..." />
                <SendMessage />
            </MessageForm>
        </Container>
    )
}
