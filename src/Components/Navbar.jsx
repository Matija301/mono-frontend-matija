import React from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import store from "../Stores/todoStore";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
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
        <Link to="/carlist/carModels" className="link">
          List all models
        </Link>
        <Link to="/carlist/carMakers" className="link">
          Car makers
        </Link>
        <Link to="newmodel" className="link">
          Add new model
        </Link>
      </div>
      <button className="open-menu" onClick={() => store.setOpensidebar()}>
        <BiMenu />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  padding: 0.8rem 1.2rem;
  box-shadow: 0px 25px 41px rgba(0, 0, 0, 0.07);
  align-items: center;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 0;
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
  .open-menu {
    display: none;
  }
  @media (max-width: 660px) {
    h2 {
      font-size: 1.8rem;
    }
    .open-menu {
      font-size: 1.8rem;
      display: flex;
      margin: 0.25rem 0 0 auto;
      appearance: none;
      border: none;
      background: var(--color-body);
      color: var(--color-bd);
      cursor: pointer;
    }
    .link-list {
      display: none;
    }
  }
`;

export default observer(Navbar);
