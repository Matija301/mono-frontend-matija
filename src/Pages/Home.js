import React from "react";
import styled from "styled-components";
import Loading from "../Components/Loading";
import picture from "../Common/orange-car.webp";
const Home = () => {
  return (
    <Wrapper>
      <div>
        <h1>Cold wheels</h1>
        <p>Your data for your cars you like!</p>
        <form>
          <label htmlFor="apiData">Enter your API key for database</label>
          <input type="text" id="apiData" />
        </form>
      </div>
      <div className="image-container">
        <img src={picture} alt="orange car" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 800rem;
  .image-container {
    width: 25rem;
    & img {
      width: 100%;
    }
  }
`;

export default Home;
