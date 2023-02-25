function filterSortList(filterOption, listModel, listMake) {
  const { searchName, searchBy, sortMakerName, sortLetters } = filterOption;
  let tempList = [...listModel];
  if (searchName !== "") {
    tempList = tempList.filter((item) => {
      return item[searchBy].toLowerCase().startsWith(searchName.toLowerCase());
    });
  }
  if (sortMakerName !== "all") {
    const { vehicleMakeId: makeId } = listMake.find((item) => {
      return item.vehicleMakeName === sortMakerName;
    });
    tempList = tempList.filter((item) => {
      return item.vehicleMakeId === makeId;
    });
  }
  if (sortLetters === "a-z") {
    tempList.sort((a, b) => {
      return a.vehicleModelName.localeCompare(b.vehicleModelName);
    });
  }
  if (sortLetters === "z-a") {
    tempList.sort((a, b) => {
      return b.vehicleModelName.localeCompare(a.vehicleModelName);
    });
  }
  return tempList;
}

export default filterSortList;
