import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Text = styled.p`
  color: #e3fbe3;
  text-align: center;
  font-size: 1.1em;
  
  @media (max-width: 768px) {
    display: none;
  }
`;