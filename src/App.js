import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router";
import MakeVehicleList from "./Components/MakeVehicleList";
import Navbar from "./Pages/Navbar";
import VehicleMake from "./Pages/VehicleMake";
import VehicleModels from "./Components/VehicleModels";
import NewModel from "./Pages/NewModel";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<VehicleMake />}>
          <Route path="carMakers" index element={<MakeVehicleList />}></Route>
          <Route path="carModels" index element={<VehicleModels />}></Route>
        </Route>
        <Route path="/newmodel" element={<NewModel />}></Route>
      </Routes>
    </>
  );
}

export default observer(App);
