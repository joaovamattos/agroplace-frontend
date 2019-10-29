import styled, { css } from 'styled-components';

export const Container = styled.ul`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    list-style: none;
    padding: 0px 10px;
    overflow-y: auto;
`

export const Message = styled.li`
    border-radius: 4px;
    border: none;
    width: max-content;
    max-width: 400px;
    margin: 5px 0;
    padding: 10px;
    padding-right: 25px;
    transiton: 0.2s;
    position: relative;

    @media (max-width: 540px) {
        max-width: 300px;
    }

    @media (max-width: 445px) {
        max-width: 200px;
    }

    ${props => props.left && css`
        background-color: #eee;
    `}

    ${props => props.right && css`
        background-color: #20CE6C;
        color: #fff;
        align-self: flex-end;
    `}

    svg{
        width: .7em;
        position: absolute;
        bottom: 5px;
        right: 5px;
        opacity: 0.7;
    }

`