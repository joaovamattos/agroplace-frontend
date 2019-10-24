import React from 'react'

import { Container, UserImage, Description, UserName, LastMessage } from './styles';

export const Chat = () => {
    return (
        <Container>
            <UserImage src="https://api.adorable.io/avatars/400/abott@adorable.io.png" alt="user image" />
            <Description>
                <UserName>Arthur</UserName>
                <LastMessage>Bom dia</LastMessage>
            </Description>
        </Container>
    )
}
