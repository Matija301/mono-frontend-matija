import Airtable from "airtable";
import { makeAutoObservable, runInAction } from "mobx";
class Todo {
  vehicleMake = [];
  vehicleModel = [];
  vehicleMakeOptons = [];
  vehicleModelSubmit = [];

  constructor() {
    makeAutoObservable(this);
    this.base = new Airtable({ apiKey: "" }).base("applZg79OWIt6P0Vh");
  }

  setSubmitModel(item) {
    this.vehicleModelSubmit = [...item];
  }

  async setLists() {
    const data = await this.base("carlistDB").select().all();
    const newList = data.map((item) => {
      return item._rawJson;
    });

    const vehicleMakeList = newList.map((vehicle) => {
      const {
        id,
        fields: { vehicleMakeAbrv, vehicleMakeName },
      } = vehicle;
      return {
        id,
        vehicleMakeAbrv: vehicleMakeAbrv[0],
        vehicleMakeName: vehicleMakeName[0],
      };
    });
    this.vehicleMake = vehicleMakeList.reduce((sum, value) => {
      let oldValue = sum;
      if (
        oldValue.findLast((item) => {
          return item.vehicleMakeName === value.vehicleMakeName;
        })
      ) {
        return oldValue;
      } else {
        oldValue.push(value);
      }
      return oldValue;
    }, []);
    const vehicleOptionMakeList = newList.map((vehicle) => {
      const {
        fields: { vehicleMakeAbrv, vehicleMakeName, vehicleMakeId },
      } = vehicle;
      return {
        vehicleMakeAbrv: vehicleMakeAbrv[0],
        vehicleMakeName: vehicleMakeName[0],
        vehicleMakeId: vehicleMakeId[0],
      };
    });
    this.vehicleMakeOptons = vehicleOptionMakeList.reduce((sum, value) => {
      let oldValue = sum;
      if (
        oldValue.findLast((item) => {
          return item.vehicleMakeName === value.vehicleMakeName;
        })
      ) {
        return oldValue;
      } else {
        oldValue.push(value);
      }
      return oldValue;
    }, []);
    this.vehicleModel = newList.map((vehicle) => {
      const {
        id,
        fields: { vehicleModelAbrv, vehicleModelName, vehicleMakeId },
      } = vehicle;
      return {
        id,
        vehicleModelAbrv: vehicleModelAbrv,
        vehicleModelName: vehicleModelName,
        vehicleMakeId: vehicleMakeId[0],
      };
    });
  }
}

const store = new Todo();

export default store;
