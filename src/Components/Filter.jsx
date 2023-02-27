import { observer } from "mobx-react-lite";
import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import store from "../Stores/todoStore";

const FIlter = () => {
  const location = useLocation();
  //
  // Filter for models
  //
  if (location.pathname === "/carlist/carModels") {
    return (
      <Wrapper>
        <div className="sort-filter">
          <h2>Sort and filter your list:</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="search">
              <label htmlFor="search">Search list for item</label>
              <input
                key="text"
                type="text"
                id="search"
                onChange={(e) => store.filterList("searchName", e.target.value)}
              />
            </div>
            <div className="search-by">
              <label htmlFor="searchSet">Search by: </label>
              <select
                name="searchSet"
                id="searchSet"
                className="filter-vehicle"
                onChange={(e) => store.filterList("searchBy", e.target.value)}
              >
                <option value="vehicleMakeId">Vehicle maker ID</option>
                <option value="vehicleModelName">Vehicle model name</option>
                <option value="vehicleModelAbrv">Also known as</option>
              </select>
            </div>
            <div className="sort-name">
              <label htmlFor="sort-maker">Sort by vehicle maker:</label>
              <select
                name="sort-name"
                id="sort-maker"
                className="sort-vehicle"
                onChange={(e) =>
                  store.filterList("sortMakerName", e.target.value)
                }
              >
                <option value="all">All</option>
                {store.vehicleMake.map((item) => {
                  const { vehicleMakeName, id } = item;
                  return (
                    <option key={id} value={vehicleMakeName}>
                      {vehicleMakeName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="sort-name">
              <label htmlFor="sort-alphabet">sort alphabetically:</label>
              <select
                name="sort-name"
                id="sort-maker"
                onChange={(e) =>
                  store.filterList("sortLetters", e.target.value)
                }
                className="sort-vehicle"
              >
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </form>
        </div>
      </Wrapper>
    );
  }
  //
  // Filter for makers
  //

  if (location.pathname === "/carlist/carMakers") {
    return (
      <Wrapper>
        <div className="sort-filter">
          <h2>Sort and filter your list:</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="search">
              <label htmlFor="search">Search list for vehicle maker:</label>
              <input
                type="text"
                id="search"
                value={store.filteredMakerList.searchName}
                onChange={(e) =>
                  store.filterListMaker("searchName", e.target.value)
                }
              />
            </div>
            <div className="search-by">
              <label htmlFor="searchSet">Search by: </label>
              <select
                key="sortBy"
                name="searchSet"
                id="searchSet"
                className="filter-vehicle"
                onChange={(e) =>
                  store.filterListMaker("searchBy", e.target.value)
                }
              >
                <option value="vehicleMakeName">Car maker</option>
                <option value="vehicleMakeAbrv">Also known as</option>
              </select>
            </div>
            <div className="sort-name">
              <label htmlFor="sort-alphabet">sort alphabetically:</label>
              <select
                name="sort-name"
                id="sort-maker"
                className="sort-vehicle"
                onChange={(e) =>
                  store.filterListMaker("sortLetters", e.target.value)
                }
              >
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </form>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.aside`
  .sort-filter {
    padding: 2.4rem 0.8rem;
  }
  h2 {
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-bottom: 1.6rem;
  }
  .search {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
    & input {
      width: 70%;
      appearance: none;
      border: none;
      border-radius: 5px;
      box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.12);
    }
  }
  .search-by {
    margin-bottom: 2.4rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
  }
  .filter-vehicle {
    background: var(--color-btn);
    border: none;
    border-radius: 5px;
    padding: 0.2rem 0.4rem;
    width: 50%;
    text-overflow: ellipsis;
    color: var(--color-btn-t);
  }
  .sort-name {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    & input {
      width: 70%;
      appearance: none;
      border: none;
      border-radius: 5px;
      box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.12);
      background: var(--color-img-sec);
    }
  }
  .sort-vehicle {
    background: var(--color-btn);
    border: none;
    border-radius: 5px;
    padding: 0.2rem 0.4rem;
    width: 50%;
    text-overflow: ellipsis;
  }
  @media (max-width: 860px) {
    max-width: 40rem;
  }
`;

export default observer(FIlter);
