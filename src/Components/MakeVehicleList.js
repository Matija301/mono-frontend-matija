import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import store from "../Stores/todoStore";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Loading from "./Loading";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
const MakeVehicleList = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  function pageInc() {
    if (page === store.filteredMakerList.length - 1) {
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
    store.filterListMaker();
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <div className="heading">
        <h2>List of vehicle makers:</h2>
      </div>
      {store.filteredMakerList.length > 0 ? (
        <>
          <div className="maker-list">
            {store.filteredMakerList[page].map((item) => {
              const { id, vehicleMakeAbrv, vehicleMakeName } = item;
              return (
                <article key={id} className="car-makers">
                  <h3>Car maker: </h3>
                  <p>{vehicleMakeName}</p>
                  <h3>Also known as:</h3>
                  <p>{vehicleMakeAbrv}</p>
                  <Link
                    className="link-list"
                    to={`../../vehicleMakerList/${vehicleMakeName}`}
                  >
                    List models
                  </Link>
                </article>
              );
            })}
          </div>
          {store.filteredMakerList.length > 0 ? (
            <div className="list-pages">
              <button className="back" onClick={() => pageDec()}>
                <AiFillCaretLeft />
              </button>
              <p className="current page">{page + 1}</p>
              <p>...</p>
              <p className="last-page">{store.filteredMakerList.length}</p>
              <button className="foward" onClick={() => pageInc()}>
                <AiFillCaretRight />
              </button>
            </div>
          ) : (
            ""
          )}{" "}
        </>
      ) : (
        <h2>Vehicle model list is empty!</h2>
      )}
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
  .link-list {
    padding: 0.6rem 1.1rem;
    background-color: var(--color-btn);
    cursor: pointer;
    border: none;
    border-radius: 15px;
    color: var(--color-btn-t);
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
  .list-pages {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    justify-content: center;

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
  @media (max-width: 800px) {
    .maker-list {
      grid-template-columns: 1fr;
    }
  }
`;

export default observer(MakeVehicleList);
