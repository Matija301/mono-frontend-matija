import React from "react";

import { useParams } from "react-router";
import VehicleModels from "../Components/VehicleModels";
const ModelsOfVehicleMaker = () => {
  const { id: params } = useParams();
  return <VehicleModels params={params} />;
};
export default ModelsOfVehicleMaker;
