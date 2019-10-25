import React from 'react'
import { Container, Text } from './styles';
import NotFoundIcon from '../../images/dark-empty.svg';

export const NotFound = ({conv}) => {
    return (
        <Container>
            <img src={NotFoundIcon} alt="Nada encontrado" width={240}/>
            {conv ? <Text>Nenhuma conversa encontrada</Text> : <Text>Nenhum contato encontrado</Text>}
        </Container>
    )}