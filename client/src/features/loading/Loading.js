import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
    transfrom: rotate(0deg);
}
to {
    transform: rotate(360deg);
}`;

const Rotate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${rotate} 1.5s linear infinite;
`;

const LoadingImage = styled.img.attrs({
  src: "../logo192.png",
  alt: "TDD!",
})`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 4px solid #823794;
  background-color: #060ce9;
`;

const Loading = () => {
  return (
    <>
      <Rotate className="container">
        <LoadingImage />
      </Rotate>
    </>
  );
};

export default Loading;
