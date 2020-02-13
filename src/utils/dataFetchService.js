const dataFetchService = async endpoint => {
  const fetchUrl = `https://starnavi-frontend-test-task.herokuapp.com/${endpoint}`;
  const fetchedData = await fetch(fetchUrl);
  const parsedData = await fetchedData.json();
  return parsedData;
};

const fetchedData = endpoint => {
  return dataFetchService(endpoint);
};

export default fetchedData;
