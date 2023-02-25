function filterSortListMaker(filterOption, listMake) {
  const { searchName, searchBy, sortLetters } = filterOption;
  let tempList = [...listMake];
  if (searchName !== "") {
    tempList = tempList.filter((item) => {
      return item[searchBy].toLowerCase().startsWith(searchName.toLowerCase());
    });
  }
  if (sortLetters === "a-z") {
    tempList.sort((a, b) => {
      return a.vehicleMakeName.localeCompare(b.vehicleMakeName);
    });
  }
  if (sortLetters === "z-a") {
    tempList.sort((a, b) => {
      return b.vehicleMakeName.localeCompare(a.vehicleMakeName);
    });
  }
  return tempList;
}

export default filterSortListMaker;
