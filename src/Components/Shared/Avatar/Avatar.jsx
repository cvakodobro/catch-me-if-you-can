import styled from "styled-components";

const CAvatar = styled.div`
  width: 100%;
  min-width: 100px;
  max-width: 120px;
  border-radius: 50%;
  border: ${(props) => props.border} solid
    ${(props) => (props.color ? props.color : "#264653")};
  position: relative;
  padding-top: 100%;
  box-shadow: 0px 0px 6px 3px ${(props) => (props.color ? props.color : "#264653")};
  box-sizing: content-box;
  ${(props) => (props.removed ? "filter: grayscale(1)" : "")};

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;

    object-fit: cover;
    object-position: top;
  }
`;

const Avatar = ({ seed, color, border = "1px", removed }) => {
  return (
    <CAvatar color={color} border={border} removed={removed}>
      <img src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`} alt="" />
    </CAvatar>
  );
};

export default Avatar;
