import styled, {css} from "styled-components";

export const Container = styled.div`
  width: 100%;  
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const Profile = styled.div`
  width: 100%;
  height: 60px;
  background-color: #eee;
  padding: 0.5em 1em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

export const RecipientImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 18px;
`;

export const RecipientName = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-left: 10px;
`;

export const NoConversationYet = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fafafa;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


export const BoxMessage = styled.ul`
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
    padding-bottom: 15px;
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
        width: .5em;
        position: absolute;
        bottom: 5px;
        right: 5px;
    }

`