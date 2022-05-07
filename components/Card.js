import { StyledCard } from "./Styled/StyledCard.style";
import { useState } from "react";

export const Card = (props) => {
  


  return (
    <StyledCard
      id={props.id}
      onChange={()=> setSelectedEnabled(props.item)}
      onClick={onclick}
    >
      <p>{props.item}</p>
    </StyledCard>
  );
};
