import React from 'react'
import { Container, Text } from './styles';
import NotFoundIcon from '../../images/taken.svg';

export const NotFound404 = () => {
    return (
        <Container>
            <img src={NotFoundIcon} alt="Nada encontrado" width={300}/>
            <strong>Erro 404</strong>
            <Text>Página não encontrada!</Text>
        </Container>
    )}