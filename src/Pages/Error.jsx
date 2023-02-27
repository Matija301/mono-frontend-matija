import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <h2>404</h2>
      <p>No wheels here!</p>
      <Link to="../" className="link">
        Go back!
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 0.8rem;
  margin-top: 4.8rem;
  h2 {
    font-size: 3.2rem;
  }
  p {
    font-size: 1.2rem;
  }
  .link {
    background-color: #ff8e3c;
    border-radius: 5px;
    padding: 0.4rem 3.2rem;
    cursor: pointer;
    border: none;
    justify-self: center;
    margin-top: 1.8rem;
    font-size: 1.2rem;
    color: var(--color-btn-t);
    transition: all 0.3s;
    &:hover {
      color: var(--color-img-sec);
    }
  }
`;
export default Error;
