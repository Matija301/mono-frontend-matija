import Airtable from "airtable";
import { makeAutoObservable } from "mobx";
import filterSortList from "../Common/filterList";
import filterSortListMaker from "../Common/filterListMaker";
import paginate from "../Common/pagination";

function getLocalData() {
  const data = localStorage.getItem("API_KEY");
  if (!data) {
    return "keyMissing";
  }
  return data;
}

class Todo {
  vehicleMake = [];
  vehicleModel = [];
  vehicleMakeOptons = [];
  filteredModelList = [];
  filteredMakerList = [];
  vehicleMakeIdList = [];
  vehicleModelEdit = {};
  setKeyAction = "";
  openSidebar = false;
  vehicleModelSubmiting = false;
  vehicleModelError = false;
  vehicleModelEdit = "";
  filteredOption = {
    searchName: "",
    searchBy: "vehicleMakeId",
    sortMakerName: "all",
    sortLetters: "a-z",
  };
  filteredOptionMaker = {
    searchName: "",
    searchBy: "vehicleMakeName",
    sortLetters: "a-z",
  };

  constructor() {
    makeAutoObservable(this);
    this.apiKey = getLocalData();
    this.base = new Airtable({ apiKey: this.apiKey }).base("applZg79OWIt6P0Vh");
  }

  async setApiKey(key) {
    if (key.trim() === "") {
      return;
    }
    this.apiKey = key;
    localStorage.setItem("API_KEY", key);

    try {
      const data = new Airtable({ apiKey: this.apiKey }).base(
        "applZg79OWIt6P0Vh"
      );
      await data("carlistDB").select().all();
      this.setKeyAction = "API key is valid!";
    } catch (error) {
      this.setKeyAction = error.message;
    }
    setTimeout(() => window.location.reload(), 2000);
  }
  deleteApiKey() {
    this.apiKey = "";
    localStorage.setItem("API_KEY", "");
    setTimeout(() => window.location.reload(), 2000);
  }

  setOpensidebar() {
    if (this.openSidebar) {
      this.openSidebar = false;
    } else {
      this.openSidebar = true;
    }
  }

  async setSubmitModel(item) {
    this.vehicleModelSubmiting = true;
    this.vehicleModelError = false;
    try {
      await this.base("carlistDB").create(item);
      this.vehicleModelSubmiting = true;
      this.vehicleModelError = "success";
    } catch (error) {
      console.log(error);
      this.vehicleModelSubmiting = true;
      this.vehicleModelError = "error";
    }
  }

  async deleteModel(id) {
    try {
      await this.base("carlistDB").destroy([id]);
    } catch (err) {
      console.log(err);
    }
  }
  resetFilter() {
    this.filteredOption = {
      searchName: "",
      searchBy: "vehicleMakeId",
      sortMakerName: "all",
      sortLetters: "a-z",
    };
    this.filteredOptionMaker = {
      searchName: "",
      searchBy: "vehicleMakeName",
      sortLetters: "a-z",
    };
  }
  // Filter and sort vehicle model list
  filterList(option, value) {
    this.filteredOption = {
      ...this.filteredOption,
      [option]: value,
    };
    this.filteredModelList = filterSortList(
      this.filteredOption,
      this.vehicleModel,
      this.vehicleMakeIdList
    );
    const paginatedData = paginate(this.filteredModelList, 4);
    this.filteredModelList = paginatedData;
  }
  //Filter and sort vehicle makers
  filterListMaker(option, value) {
    this.filteredOptionMaker = {
      ...this.filteredOptionMaker,
      [option]: value,
    };
    this.filteredMakerList = filterSortListMaker(
      this.filteredOptionMaker,
      this.vehicleMake
    );
    const paginatedData = paginate(this.filteredMakerList, 2);
    this.filteredMakerList = paginatedData;
  }

  async editList(itemId) {
    const { fields } = await this.base("carlistDB").find(itemId);
    this.vehicleModelEdit = { ...fields };
  }
  async submitEditedList(editedModel) {
    this.vehicleModelEdit = "";
    try {
      console.log("success");
      await this.base("carlistDB").update(editedModel);
      this.vehicleModelEdit = "success";
    } catch (error) {
      console.log(error);
      this.vehicleModelEdit = "error";
    }
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
        vehicleMakeAbrv: vehicleMakeAbrv,
        vehicleMakeName: vehicleMakeName,
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
    const vehicleMakeIdList = newList.map((vehicle) => {
      const {
        fields: { vehicleMakeName, vehicleMakeId },
      } = vehicle;
      return {
        vehicleMakeId: vehicleMakeId,
        vehicleMakeName: vehicleMakeName,
      };
    });
    this.vehicleMakeIdList = vehicleMakeIdList.reduce((sum, value) => {
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
        vehicleMakeAbrv: vehicleMakeAbrv,
        vehicleMakeName: vehicleMakeName,
        vehicleMakeId: vehicleMakeId,
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
        vehicleMakeId: vehicleMakeId,
      };
    });
  }
}

const store = new Todo();

export default store;
