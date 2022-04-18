import { StyledButton } from "./Styled/StyledButton";

export const Button= (props) => {
  return (
    <div>
      <StyledButton type={props.type}>{props.value}</StyledButton>
    </div>
  );
};
