import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="text">Loading</div> <div className="ring"></div>;
    </Wrapper>
  );
};
const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;
const Wrapper = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 10rem auto;
  .ring {
    width: 100%;
    height: 100%;
    border-left: 4px solid var(--color-h);
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
  }

  .text {
    color: var(--color-h);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 20rem;
    font-weight: 800;
    font-size: 2rem;
    text-transform: uppercase;
  }
`;
export default Loading;
