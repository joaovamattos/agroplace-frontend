import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Panel = styled.div`
  display: flex;
  width: 1000px;
  max-width: 95%;
  height: 80vh;
  background-color: #fff;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1),
    0 2px 2px -2px rgba(0, 0, 0, 0.1);
  border-box: 4px;
  overflow: hidden;
  position: relative;

  @media (max-width: 414px) {
    max-width: 100%;
    height: 87vh;
  }
`;

export const ConversationsIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 380px;
  height: 100%;
  background-color: #20ce6c;
  transition: 0.5s;
  margin: 0;
  padding: 0;
  
  &:hover {
    width: 380px;
  }

  @media (max-width: 768px) {
    width: 60px;
  }

  @media (max-width: 414px) {
    width: 45px;
  }
`;
