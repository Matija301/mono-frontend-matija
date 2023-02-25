import React from "react";
import styled from "styled-components";

const Modal = ({ setModal, deleteModel, deleteModelAction }) => {
  return (
    <Wrapper>
      <div className="sticky">
        <h4>Do you want to delete this model?</h4>
        <p>Vehicle name: {deleteModel.vehicleModelName}</p>
        <div className="actions-container">
          <button className="btn" onClick={() => setModal(false)}>
            No
          </button>
          <button
            className="btn"
            onClick={() => deleteModelAction(deleteModel.id)}
          >
            Yes
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: absolute;
  &::before {
    content: "";
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.4;
    position: fixed;
    background: red;
    background: rgb(0, 0, 0);
  }
  .sticky {
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 30%;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    background: var(--color-btn);
    padding: 1.2rem 2.4rem;
    border-radius: 15px;
    gap: 0.8rem;
  }

  h4 {
    align-self: center;
    font-size: 1.2rem;
    margin-bottom: 0;
    text-align: center;
  }
  p {
    margin: 0;
  }
  .actions-container {
    grid-row: 3;
    justify-self: center;
    display: flex;
    gap: 4.8rem;
  }
  .btn {
    padding: 0.4rem 1.2rem;
    appearance: none;
    border: none;
    background: var(--color-img-tert);
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default Modal;
