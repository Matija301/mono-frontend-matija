import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import store from "../Stores/todoStore";

const Home = (e) => {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await store.setApiKey(key);
    setKey("");
    setMessage(store.setKeyAction);
  }
  async function deleteApiKey() {
    store.deleteApiKey();
    setMessage("API key has been deleted!");
  }
  return (
    <Wrapper>
      <h1>List your cold wheels!!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        laborum accusantium eos obcaecati nisi nam natus quaerat non
        consequuntur a impedit, minus esse aspernatur? Magnam corrupti a
        consectetur inventore deleniti?
      </p>
      {message !== "" ? (
        <h3 className="msg">{message}! Page will reload!</h3>
      ) : (
        ""
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="apiData">Enter your API key for database:</label>
        <input
          type="text"
          id="apiData"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter the API key"
        />
        <button type="submit">Submit API key</button>
        <button type="button" onClick={deleteApiKey}>
          Delete API from browser storage
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  max-width: 800rem;
  padding: 1.8rem;
  h1 {
    font-size: 7rem;
    margin-bottom: 2.4rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 6.4rem;
  }
  .msg {
    font-size: 0.8rem;
  }
  form {
    font-size: 1.2rem;
    display: flex;
    gap: 0.8rem;
    & input {
      appearance: none;
      border: none;
      background: var(--color-btn);
      border-radius: 15px;
      color: var(--color-btn-t);
      text-overflow: ellipsis;
    }
    & button {
      background: var(--color-btn);
      border-radius: 15px;
      color: var(--color-btn-t);
      border: none;
      font-size: 1.2rem;
      padding: 0.4rem 0.6rem;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: var(--color-img-sec);
      }
    }
  }
  @media (max-width: 1080px) {
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 0.8rem;
      margin-bottom: 3.2rem;
    }
    form {
      flex-direction: column;
      align-items: flex-start;
      & input {
        padding: 0.4rem;
      }
      & button {
        &:last-child {
          margin-top: 2.4rem;
        }
      }
    }
  }
`;

export default observer(Home);
