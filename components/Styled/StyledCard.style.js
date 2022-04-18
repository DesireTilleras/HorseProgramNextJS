import styled from "styled-components";


export const StyledCard = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid red;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
  cursor: pointer;

  &.isChosen{
    background-color: pink;
  }

  &:hover,:active,:focus {
    border: 1px solid blue;
  }
 h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }
 p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

export const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;

`;