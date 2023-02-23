import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
      <div className="logo">
        <h2>Cold Wheels</h2>
      </div>
      <div className="link-list">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="carModels" className="link">
          List all models
        </Link>
        <Link to="carMakers" className="link">
          Car makers
        </Link>
        <Link to="newmodel" className="link">
          Add new model
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  padding: 0.8rem 1.2rem;
  border-bottom: 2px solid #000;

  h2 {
    font-size: 2.4rem;
  }
  .link-list {
    display: flex;
    font-size: 0.8rem;
    gap: 1.8rem;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 auto;
    & p {
      margin: 0;
    }
  }
  .link {
    color: var(--color-p);
    display: block;
    transition: all 0.3s;
    &:hover {
      color: var(--color-btn);
    }
  }
`;

export default Navbar;
