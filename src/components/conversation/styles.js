import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 90vh;
`;

export const Panel = styled.div`
  display: flex;
  width: 100%
  background-color: #fff;
  height: 100%;
`;

export const ConversationsIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 340px;
  width: 340px;
  height: 100%;
  background-color: #20ce6c;
  transition: 0.5s;
  box-sizing: border-box;
  padding-top: 1em;

  &:hover {
    width: 340px;
  }
  
  @media (max-width: 950px) {
    width: 300px;

    &:hover {
      width: 300px;
    }
  }

  @media (max-width: 870px) {
    width: 60px;
  }

  @media (max-width: 414px) {
    width: 45px;
  }
`;
