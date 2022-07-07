import styled from "styled-components";
import { Button as MuiButton } from "@mui/material";
import { useNavigate } from "react-router";

const CButton = styled(MuiButton)`
  &.MuiButton-root {
    padding: 16px 36px;
    text-transform: capitalize;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #264653;
    border-radius: 12px;
    text-align: center;
    color: white;
    transition: transform 0.1s ease-in-out;
    transition-timing-function: ease-out;
    margin: 0;
    display: inline-flex;
    flex-direction: column;

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    :hover {
      cursor: pointer;
      transform: scale(1.05);
      transition-timing-function: ease-in;
      background-color: rgba(0, 0, 0, 0.4);
    }

    :active {
      transform: scale(0.96);
      transition-duration: 0.05s;
    }
  }
`;

const Button = ({ children, href, ...props }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (props.onClick) props.onClick();
    if (href && !props.disabled) navigate(href);
  };

  return (
    <CButton {...props} onClick={onClick}>
      {children}
    </CButton>
  );
};

export default Button;
