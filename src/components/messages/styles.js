import styled, { css } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow:auto; 
    box-sizing: border-box;
    max-width: 40%;
`

export const Message = styled.p`
    padding: .3em .5em;
    border-radius: 4px;
    border:none;
    width: max-content;
    margin: .2em 1em;

    ${props => props.left && css`
        background-color: #eee;
    `}

    ${props => props.right && css`
        background-color: #20CE6C;
        color: #fff;
        align-self: flex-end;
    `}

`