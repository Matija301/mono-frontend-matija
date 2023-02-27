import { observer } from "mobx-react-lite";
import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Filter from "../Components/Filter";

const VehicleLists = () => {
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
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export default observer(VehicleLists);
