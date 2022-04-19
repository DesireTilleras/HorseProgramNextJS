import { StyledButton } from "./Styled/StyledButton";

export const Button= (props) => {
  return (
    <div>
      <StyledButton type={props.type} onClick={props.onclick}>{props.value}</StyledButton>
    </div>
  );
};
