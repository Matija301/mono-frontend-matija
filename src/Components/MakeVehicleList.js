import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import store from "../Stores/todoStore";

const makeVehicleList = () => {
  return (
    <Wrapper>
      <div className="heading">
        <h2>List of vehicle makers:</h2>
      </div>
      <div className="maker-list">
        {store.vehicleMake.map((item) => {
          const { id, vehicleMakeAbrv, vehicleMakeName } = item;
          return (
            <article key={id} className="car-makers">
              <h3>Car maker: </h3>
              <p>{vehicleMakeName}</p>
              <h3>Also known as:</h3>
              <p>{vehicleMakeAbrv}</p>
              <button>List models</button>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  justify-self: center;
  margin: 0.8rem;
  p {
    font-size: 0.8rem;
  }
  .heading {
    margin: 1.8rem 0 0.8rem 0;
    width: 100%;
    max-width: 40rem;
    & h2 {
      text-transform: uppercase;
      font-size: 1.8rem;
      text-align: left;
    }
  }
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  button {
    padding: 0.6rem 1.1rem;
    background-color: var(--color-btn);
    cursor: pointer;
    border: none;
    border-radius: 15px;
  }
  .maker-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1.2rem 0.8rem;
    gap: 3.2rem;
  }
  .car-makers {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    padding: 0.8rem 4.8rem;
  }
  @media (max-width: 800px) {
    .maker-list {
      grid-template-columns: 1fr;
    }
  }
`;

export default observer(makeVehicleList);
