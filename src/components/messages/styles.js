import styled, { css } from 'styled-components';

export const Container = styled.ul`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    list-style: none;
    overflow-y: auto;
    padding: 0 10px;
`

export const Message = styled.li`
    border-radius: 4px;
    border: none;
    width: max-content;
    max-width: 30em;
    margin: 5px 0;
    padding: 10px;
    ${props => props.left && css`
        background-color: #eee;
    `}

    ${props => props.right && css`
        background-color: #20CE6C;
        color: #fff;
        align-self: flex-end;
    `}

`