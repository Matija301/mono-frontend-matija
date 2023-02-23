import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import store from "../Stores/todoStore";
import Filter from "./Filter";

const VehicleMake = () => {
  useEffect(() => {
    store.setLists();
  }, []);

  return (
    <Wrapper>
      <Filter></Filter>
      <Outlet></Outlet>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 20rem 1fr;
`;

export default observer(VehicleMake);
