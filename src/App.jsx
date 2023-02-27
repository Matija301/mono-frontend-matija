import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router";
import MakeVehicleList from "./Components/MakeVehicleList";
import Navbar from "./Components/Navbar";
import VehicleModels from "./Components/VehicleModels";
import NewModel from "./Pages/NewModel";
import Home from "./Pages/Home";
import EditModel from "./Pages/EditModel";
import ModelsOfVehicleMaker from "./Pages/ModelsOfVehicleMaker";
import VehicleLists from "./Pages/VehicleLists";
import Sidebar from "./Components/Sidebar";
import Error from "./Pages/Error";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="carlist" element={<VehicleLists />}>
          <Route path="carMakers" element={<MakeVehicleList />} />
          <Route path="carModels" element={<VehicleModels />} />
        </Route>
        <Route path="editmodel/:id" element={<EditModel />} />
        <Route path="vehicleMakerList/:id" element={<ModelsOfVehicleMaker />} />
        <Route path="newmodel" element={<NewModel />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default observer(App);
