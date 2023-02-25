import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router";
import MakeVehicleList from "./Components/MakeVehicleList";
import Navbar from "./Pages/Navbar";
import VehicleMake from "./Pages/VehicleMake";
import VehicleModels from "./Components/VehicleModels";
import NewModel from "./Pages/NewModel";
import Home from "./Pages/Home";
import EditModel from "./Pages/EditModel";
import ModelsOfVehicleMaker from "./Pages/ModelsOfVehicleMaker";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="carlist" element={<VehicleMake />}>
          <Route path="carMakers" element={<MakeVehicleList />} />
          <Route path="carModels" element={<VehicleModels />} />
        </Route>
        <Route path="editmodel/:id" element={<EditModel />} />
        <Route path="vehicleMakerList/:id" element={<ModelsOfVehicleMaker />} />
        <Route path="newmodel" element={<NewModel />} />
      </Routes>
    </>
  );
}

export default observer(App);
