import axios from "axios";

// Define a query function that will receive the query key
async function defaultQueryFn(apiName, apiPath) {
  const { data } = await axios.get(`/oms/${apiPath}`) // the testing url
  return data
}
export default defaultQueryFn;