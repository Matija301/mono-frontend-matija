import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import store from "../Stores/todoStore";

const NewModel = () => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [modelName, setModelName] = useState("");
  const [modelAbrv, setModelAbrv] = useState("");
  const [makerId, setMakerId] = useState("");
  const [makerName, setMakerName] = useState("");
  const [makerAbrv, setMakerAbrv] = useState("");

  // // vehicleMakeAbrv
  // vehicleMakeName
  // vehicleModelAbrv
  // vehicleModelName
  // vehicleMakeId

  async function getData() {
    setLoading(true);
    await store.setLists();
    setSelected(store.vehicleMakeOptons[0]);
    setLoading(false);
  }

  function submitData(e) {
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
          fields: {
            vehicleModelName: modelName,
            vehicleMakeAbrv: [makerAbrv],
            vehicleMakeName: [makerName],
            vehicleModelAbrv: [modelAbrv],
            vehicleMakeId: [makerId],
          },
        },
      ];
      console.log(newModel);
    }
  }

  function changeSelected(e) {
    if (e.target.value === "newMaker") {
      setSelected("newMaker");
      setMakerId("");
      setMakerName("");
      setMakerAbrv("");
    } else {
      const value = store.vehicleMakeOptons.find(
        (item) => item.vehicleMakeName === e.target.value
      );
      setSelected(value);
    }
  }

  function setMaker() {
    if (selected === "newMaker") {
      return;
    } else {
      setMakerId(selected.vehicleMakeId);
      setMakerName(selected.vehicleMakeName);
      setMakerAbrv(selected.vehicleMakeAbrv);
    }
  }

  useEffect(() => {
    if (!loading) {
      setMaker();
    }
  }, [selected]);

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="text">Loading...</div> <div className="ring"></div>
      </div>
    );
  }

  return (
    <Wrapper>
      <h2>Create new vehicle model</h2>
      <div className="form-container">
        <form onSubmit={(e) => submitData(e)}>
          <div className="grid-container">
            <label htmlFor="modelName">
              What is the name for vehicle model?
            </label>
            <input
              type="text"
              id="modelName"
              name="vehicleModelName"
              onChange={(e) => setModelName(e.target.value)}
              value={modelName}
            />
          </div>
          <div className="grid-container">
            <label htmlFor="modelAbrv">How people also call it?</label>
            <input
              type="text"
              id="modelAbrv"
              name="vehicleModelName"
              onChange={(e) => setModelAbrv(e.target.value)}
              value={modelAbrv}
            />
          </div>
          <div className="grid-container">
            <label htmlFor="vehicleMaker">Select vehicle maker:</label>
            <select
              name="vehicleMakeName"
              id="vehicleMaker"
              className="vehicle-maker"
              onChange={(e) => changeSelected(e)}
            >
              {store.vehicleMakeOptons.map((item) => {
                const { vehicleMakeName, vehicleMakeId } = item;
                return (
                  <option key={vehicleMakeId} value={vehicleMakeName}>
                    {vehicleMakeName}
                  </option>
                );
              })}
              <option value="newMaker">Create new maker</option>
            </select>
          </div>

          {selected !== "newMaker" ? (
            <div className="grid-container">
              <h3>Vehicle maker info:</h3>
              <p>Currenty selected maker name: {selected.vehicleMakeName}</p>
              <p>Currenty selected maker ID: {selected.vehicleMakeId}</p>
              <p>
                Currenty selected maker Abbreviation: {selected.vehicleMakeAbrv}
              </p>
            </div>
          ) : (
            <div className="create-maker">
              <div className="maker__item">
                <label htmlFor="makerName">Name of the vehicle maker:</label>
                <input
                  type="text"
                  id="makerName"
                  name="vehicleMakeName"
                  onChange={(e) => setMakerName(e.target.value)}
                  value={makerName}
                />
              </div>
              <div className="maker__item">
                <label htmlFor="makerAbr">
                  Abbreviation of the vehicle maker:
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
                <label htmlFor="makerID">ID of the vehicle maker:</label>
                <input
                  type="text"
                  id="makerID"
                  name="vehicleMakeId"
                  value={makerId}
                  onChange={(e) => setMakerId(e.target.value)}
                />
              </div>
            </div>
          )}
          <button type="submit" className="submit-btn">
            Create model
          </button>
        </form>
      </div>
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

const Wrapper = styled.main`
  max-width: 40rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2 {
    font-size: 2rem;
    letter-spacing: 0.15rem;
    margin: 4.8rem 0 2.4rem 0;
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
  }

  .loading-container {
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
  }
`;

export default observer(NewModel);
