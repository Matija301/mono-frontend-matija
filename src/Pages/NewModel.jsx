import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Loading from "../Components/Loading";
import store from "../Stores/todoStore";

const NewModel = () => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [modelName, setModelName] = useState("");
  const [modelAbrv, setModelAbrv] = useState("");
  const [makerId, setMakerId] = useState("");
  const [makerName, setMakerName] = useState("");
  const [makerAbrv, setMakerAbrv] = useState("");
  const navigate = useNavigate();
  const navigateBack = useNavigate();
  async function getData() {
    try {
      setLoading(true);
      await store.setLists();
      setSelected(store.vehicleMakeOptons[0]);
      setLoading(false);
    } catch (error) {
      navigate("../../");
    }
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
            vehicleMakeAbrv: makerAbrv,
            vehicleMakeName: makerName,
            vehicleModelAbrv: modelAbrv,
            vehicleMakeId: makerId,
          },
        },
      ];
      store.setSubmitModel(newModel);
      setModelName("");
      setModelAbrv("");
      setMakerId("");
      setMakerName("");
      setMakerAbrv("");
      setTimeout(() => {
        navigateBack("../");
      }, 2000);
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
    return <Loading />;
  }

  return (
    <Wrapper>
      <h2>Create new vehicle model</h2>
      {store.vehicleModelError === "error" ? (
        <div className="msg">There is error in posting data to server</div>
      ) : store.vehicleModelError === "success" ? (
        <div className="msg">Successfully created new vehicle model!</div>
      ) : (
        ""
      )}
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
    transition: all 0.3s;
    &:hover {
      color: var(--color-img-sec);
    }
  }
  .msg {
    font-size: 0.8rem;
    text-transform: uppercase;
  }
`;

export default observer(NewModel);
