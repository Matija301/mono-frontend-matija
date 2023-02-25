function paginate(list, numberPerPage) {
  const pages = Math.ceil(list.length / numberPerPage);
  const paginatedList = Array.from({ length: pages }, (_, index) => {
    const start = index * numberPerPage;
    return list.slice(start, start + numberPerPage);
  });
  return paginatedList;
}

export default paginate;
