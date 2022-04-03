import { StyledCard } from "./Styled/StyledCard.style";

export const Card = (props) => {
  return (
    <StyledCard>
      <p key={props.key}>{props.item}</p>
    </StyledCard>
  );
};
