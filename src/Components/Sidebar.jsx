import { observer } from "mobx-react-lite";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import store from "../Stores/todoStore";
const Sidebar = () => {
  return (
    <Wrapper>
      <aside
        className={`${store.openSidebar ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="logo">
          <h2>Cold Wheels</h2>
          <button className="open-menu" onClick={() => store.setOpensidebar()}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="link-list">
          <Link to="/" className="link" onClick={() => store.setOpensidebar()}>
            Home
          </Link>
          <Link
            to="/carlist/carModels"
            className="link"
            onClick={() => store.setOpensidebar()}
          >
            List all models
          </Link>
          <Link
            to="/carlist/carMakers"
            className="link"
            onClick={() => store.setOpensidebar()}
          >
            Car makers
          </Link>
          <Link
            to="newmodel"
            className="link"
            onClick={() => store.setOpensidebar()}
          >
            Add new model
          </Link>
        </div>
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #eff0f3;
    transition: all 0.3s;
    transform: translate(-100%);
    z-index: -1;
  }
  .logo {
    padding: 1.2rem;
    display: flex;
    & h2 {
      font-size: 1.8rem;
      margin-bottom: 0;
    }
    & button {
      font-size: 1.8rem;
      display: flex;
      margin: 0.4rem 0 0 auto;
      appearance: none;
      border: none;
      background: var(--color-body);
      color: var(--color-bd);
      cursor: pointer;
    }
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .link-list {
    display: flex;
    font-size: 1rem;
    gap: 1.8rem;
    justify-content: center;
    align-items: center;
    margin-left: 0.8rem;
    align-items: flex-start;
    flex-direction: column;

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
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;
export default observer(Sidebar);
