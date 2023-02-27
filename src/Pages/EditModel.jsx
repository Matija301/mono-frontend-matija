import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import store from "../Stores/todoStore";
import Loading from "../Components/Loading";
import { useNavigate, useParams } from "react-router";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const EditModel = () => {
  const [loading, setLoading] = useState(true);
  const [modelName, setModelName] = useState("");
  const [modelAbrv, setModelAbrv] = useState("");
  const [makerId, setMakerId] = useState("");
  const [makerName, setMakerName] = useState("");
  const [makerAbrv, setMakerAbrv] = useState("");
  const navigate = useNavigate();

  const { id: itemId } = useParams();

  async function getData() {
    setLoading(true);
    await store.setLists();
    await store.editList(itemId);
    setModelName(store.vehicleModelEdit.vehicleModelName);
    setModelAbrv(store.vehicleModelEdit.vehicleModelAbrv);
    setMakerId(store.vehicleModelEdit.vehicleMakeId);
    setMakerName(store.vehicleModelEdit.vehicleMakeName);
    setMakerAbrv(store.vehicleModelEdit.vehicleMakeAbrv);
    setLoading(false);
  }

  async function submitData(e) {
    e.preventDefault();
    if (
      modelName.trim() !== "" &&
      modelAbrv.trim() !== "" &&
      makerId.trim() !== "" &&
      makerName.trim() !== "" &&
      makerAbrv.trim() !== ""
    ) {
      const newModel = [
        {
          id: itemId,
          fields: {
            vehicleModelName: modelName,
            vehicleMakeAbrv: makerAbrv,
            vehicleMakeName: makerName,
            vehicleModelAbrv: modelAbrv,
            vehicleMakeId: makerId,
          },
        },
      ];
      await store.submitEditedList(newModel);
      setTimeout(() => {
        navigate("../carlist/carModels");
      }, 1000);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (store.vehicleModelEdit === {}) {
    return <h2>Error, item can not be found!</h2>;
  }
  return (
    <Wrapper>
      <div className="header-link">
        <h2>Edit vehicle model</h2>
        <Link className="link-to" to="../../carlist/carModels">
          Go back to vehicle models! {<AiOutlineArrowRight />}
        </Link>
      </div>

      <h3>{store.vehicleModelEdit.id}</h3>
      {store.vehicleModelEdit === "error" ? (
        <h3 className="msg">There is error in posting data to server!</h3>
      ) : store.vehicleModelEdit === "success" ? (
        <div className="msg">Edit has been successful! </div>
      ) : (
        ""
      )}
      <div className="form-container">
        <form onSubmit={(e) => submitData(e)}>
          <div className="grid-container">
            <label htmlFor="modelName">Edit the name for vehicle model?</label>
            <input
              type="text"
              id="modelName"
              name="vehicleModelName"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          <div className="grid-container">
            <label htmlFor="modelAbrv">Edit the name people also call it</label>
            <input
              type="text"
              id="modelAbrv"
              name="vehicleModelName"
              value={modelAbrv}
              onChange={(e) => setModelAbrv(e.target.value)}
            />
          </div>
          <div className="create-maker">
            <div className="maker__item">
              <label htmlFor="makerName">
                Edit the name of a vehicle maker:
              </label>
              <input
                type="text"
                id="makerName"
                name="vehicleMakeName"
                value={makerName}
                onChange={(e) => setMakerName(e.target.value)}
              />
            </div>
            <div className="maker__item">
              <label htmlFor="makerAbr">
                Edit abbreviation of the vehicle maker:
              </label>
              <input
                type="text"
                id="makerAbr"
                name="vehicleMakeAbrv"
                value={makerAbrv}
                onChange={(e) => setMakerAbrv(e.target.value)}
              />
            </div>
            <div className="maker__item">
              <label htmlFor="makerID">Edit ID of the vehicle maker:</label>
              <input
                type="text"
                id="makerID"
                name="vehicleMakeId"
                value={makerId}
                onChange={(e) => setMakerId(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Edit model
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  max-width: 40rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  .header-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4.8rem 0 2.4rem 0;
    gap: 8rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  .link-to {
    background: var(--color-btn);
    padding: 0.4rem 0.6rem;
    border-radius: 5px;
    color: var(--color-btn-t);
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    & svg {
      z-index: 4;
    }
  }
  .msg {
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }
  .form-container {
    max-width: 40rem;
  }
  form {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    box-shadow: 4.1px 3.8px 4.5px rgba(0, 0, 0, 0.033),
      33px 30px 36px rgba(0, 0, 0, 0.05);
    border: 2px solid #000;
    border-radius: 5px;
    padding: 0.8rem 1.2rem;
  }
  .grid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    & input {
      appearance: none;
      border: none;
      box-shadow: 2px 2px 11px rgba(0, 0, 0, 0.04);
      width: 50%;
      font-size: 0.8;
      border-radius: 5px;
      padding: 0.1rem 0.2rem;
      font-weight: 400;
      align-self: center;
    }

    & label {
      font-size: 0.7rem;
      align-self: flex-start;
    }
    .vehicle-maker {
      background-color: #ff8e3c;
      border-radius: 5px;
      padding: 0.4rem 0.8rem;
      border: none;
    }
    h3 {
      margin-top: 0.8rem;
    }
  }
  .create-maker {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
  .maker__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    & label {
      font-size: 0.7rem;
      align-self: flex-start;
    }
    & input {
      appearance: none;
      border: none;
      box-shadow: 2px 2px 11px rgba(0, 0, 0, 0.04);
      width: 50%;
      font-size: 0.8;
      border-radius: 5px;
      padding: 0.1rem 0.2rem;
      font-weight: 400;
      align-self: center;
    }
  }
  .submit-btn {
    background-color: #ff8e3c;
    border-radius: 5px;
    padding: 0.4rem 3.2rem;
    cursor: pointer;
    border: none;
    justify-self: center;
    margin-top: 1.8rem;
    transition: all 0.3s;
    &:hover {
      color: var(--color-img-sec);
    }
  }
  @media (max-width: 680px) {
    .header-link {
      flex-direction: column;
      gap: 0;
    }
  }
`;

export default observer(EditModel);
