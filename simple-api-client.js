const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

const secrets = require('./secrets');

console.log(`Setting up API client @ ${secrets.everactive_baseurl}`);

// oauth helper method to retrieve client_credentials grant_type
// access_token.
const getClientCredentials = oauth.client(axios.create(), {
  url: `${secrets.everactive_baseurl}/auth/token`,
  grant_type: 'client_credentials',
  client_id: secrets.everactive_client_id,
  client_secret: secrets.everactive_client_secret,
});

(async function main() {

  console.log("Hello Everactive API");

  // Prepare the REST Client.
  const apiClient = axios.create({
    baseURL: secrets.everactive_baseurl,
  });

  // Interceptor to retrieve an access token and cache until the token
  // expires. When the token expires a new request will be made using the
  // getClientCredentials method to get a new token.
  apiClient.interceptors.request.use(
    oauth.interceptor(tokenProvider, getClientCredentials)
  );

  // Contact the API Endpoints as specified in https://api-spec.data.everactive.com/

  console.log("Get a list of sensors from /ds/v1/eversensors");
  const sensorListResponse = await apiClient.get('/ds/v1/eversensors');
  console.log(`${sensorListResponse.status} - ${sensorListResponse.statusText}`);
  if (sensorListResponse.status != 200) {
    console.error("Request Failed");
    process.exit(1);
  }
  console.log("PaginationInfo:", sensorListResponse.data.paginationInfo);
  console.log("ListSummary:", sensorListResponse.data.listSummary);

  // details
  if (sensorListResponse.data.data.length > 0) {
    console.log("First sensor");
    const firstsensor = sensorListResponse.data.data[0]
    console.log(firstsensor);
    console.log('\n\n');

    //sensor time series data
    console.log(`Last Time series data for sensor id ${firstsensor.macAddress}`);
    const lastReadingUnixTimestamp = firstsensor.sensor?.lastReading?.timestamp;
      // Retrieve the last reading from this sensor
      const timeseriesResponse = await apiClient.get(`/ds/v1/eversensors/${firstsensor.macAddress}/readings/last`);
      console.log(`${timeseriesResponse.status} - ${timeseriesResponse.statusText}`);
      if (timeseriesResponse.status != 200) {
        console.error("Request Failed");
        process.exit(1);
      }
      console.log(timeseriesResponse.data);      
  }
})();