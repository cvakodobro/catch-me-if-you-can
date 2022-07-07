import styled from "styled-components";

const CTextField = styled.input`
  display: inline-block;
  width: 75%;
  height: 30%;
  padding: 22px 32px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #264653;
  border-radius: 10px;
  text-align: center;
  font-size: large;
  color: var(--secondary);
  box-shadow: inset 1px 3px 10px #2a9d8f73;

  ::placeholder {
    color: #fff;
    opacity: 1;
  }
  :focus {
    outline: 2px solid var(--secondary);
    outline-offset: 2px;
  }
`;
const TextField = (props) => {
  return <CTextField {...props} />;
};

export default TextField;
