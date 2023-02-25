import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import store from "../Stores/todoStore";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const VehicleModels = ({ params }) => {
  const [modal, setModal] = useState(false);
  const [deleteModel, setDelteModel] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  function openModalDelete(id, vehicleModelName) {
    setDelteModel({ id, vehicleModelName });
    setModal(true);
  }

  function pageInc() {
    if (page === store.filteredModelList.length - 1) {
      return;
    } else {
      setPage(page + 1);
    }
  }
  function pageDec() {
    if (page === 0) {
      return;
    } else {
      setPage(page - 1);
    }
  }

  async function getData() {
    setLoading(true);
    await store.setLists();
    store.resetFilter();
    if (params) {
      store.filterList("sortMakerName", params);
    } else {
      store.filterList();
    }
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  async function deleteModelAction(id) {
    setModal(false);
    await store.deleteModel(id);
    await getData();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {modal === true ? (
        <Modal
          setModal={setModal}
          deleteModel={deleteModel}
          deleteModelAction={deleteModelAction}
        />
      ) : (
        ""
      )}
      {params ? (
        <Link className="link-to" to="../../carlist/carMakers">
          Go back to vehicle makers! {<AiOutlineArrowRight />}
        </Link>
      ) : (
        ""
      )}
      <div className="heading">
        <h2>list of all models:</h2>
      </div>
      <div className="maker-list">
        {store.filteredModelList.length > 0 ? (
          store.filteredModelList[page].map((item) => {
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
                  <Link to={`../../editmodel/${id}`} className="edit icon">
                    <FaEdit />
                  </Link>
                  <div
                    className="delete icon"
                    onClick={() => openModalDelete(id, vehicleModelName)}
                  >
                    <MdDelete />
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <h2>Vehicle model list is empty!</h2>
        )}
      </div>
      {store.filteredModelList.length > 0 ? (
        <div className="list-pages">
          <button className="back" onClick={() => pageDec()}>
            <AiFillCaretLeft />
          </button>
          <p className="current page">{page + 1}</p>
          <p>...</p>
          <p className="last-page">{store.filteredModelList.length}</p>
          <button className="foward" onClick={() => pageInc()}>
            <AiFillCaretRight />
          </button>
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
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
  .list-pages {
    display: flex;
    gap: 0.8rem;
    align-items: center;

    & button {
      padding: 0.2rem 0.3rem;
      background: var(--color-btn);
      appearance: none;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      & svg {
        color: var(--color-h);
      }
    }
    & p {
      margin: 0;
    }
  }
  .link-to {
    background: var(--color-btn);
    padding: 0.4rem 0.6rem;
    border-radius: 5px;
    color: var(--color-btn-t);
    font-size: 0.8rem;
    position: absolute;
    top: 5.5%;
    right: 30%;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    & svg {
      z-index: 4;
    }
  }
`;

export default observer(VehicleModels);
