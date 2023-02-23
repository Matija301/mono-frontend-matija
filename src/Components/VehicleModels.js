import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import store from "../Stores/todoStore";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const VehicleModels = () => {
  return (
    <Wrapper>
      <div className="heading">
        <h2>list of all models:</h2>
      </div>
      <div className="maker-list">
        {store.vehicleModel.map((item) => {
          const { id, vehicleModelAbrv, vehicleModelName, vehicleMakeId } =
            item;
          return (
            <article key={id} className="car-makers">
              <p>
                Vehicle maker ID: <span>{vehicleMakeId}</span>
              </p>
              <p>
                Vehicle model name: <span>{vehicleModelName}</span>
              </p>
              <p>
                Also known as: <span>{vehicleModelAbrv}</span>
              </p>
              <div className="icons">
                <div className="edit icon">
                  <FaEdit />
                </div>
                <div className="delete icon">
                  <MdDelete />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  margin: 0.8rem;
  gap: 1.2rem;
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
  .car-makers {
    max-width: 40rem;
    display: grid;
    margin-bottom: 1.2rem;
    grid-template-columns: 1fr 1fr 1fr 0.25fr;
    padding: 1.2rem 1.8rem;
    align-items: center;
    box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.12);
    gap: 0.8rem;
    & p {
      font-size: 0.8rem;
      margin-bottom: 0;

      & span {
        font-weight: 800;
      }
    }
    .icons {
      display: flex;
      gap: 0.8rem;
      cursor: pointer;
      & svg {
        height: 1.2rem;
        width: 1.2rem;
        color: var(--color-btn);
      }
    }
  }
`;

export default observer(VehicleModels);
