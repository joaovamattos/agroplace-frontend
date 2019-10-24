import styled, { css } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow:auto; 
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