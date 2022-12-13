# nodejs-api-client-sample

Sample nodejs application that interacts with the Everactive APIs. 

In this repo you'll find examples to work with the [Edge Platform API](https://docs.api.everactive.com) and with the [MVM API](https://api-spec.data.everactive.com/everactive-api.html#tag/Machine).

## Configuration

in order to run this example you need to create a `secrets.js` file with your API credentials:

```
module.exports = {
  "everactive_baseurl": "https://api.data.everactive.com",
  "everactive_client_id": "********************",
  "everactive_client_secret": "********************"
}
```

You can rename the `secrets_example.js` file to `secrets.js` and replace the values inside with your credentials.

## Running the application

This application is based on the Axios Http client (https://www.npmjs.com/package/axios). To install the dependencies run

```
npm install
```

To execute the Edge Platform API example

```
npm run api-client
```


To execute the MVM example

```
npm run mvm-client
```

## Runing with Docker

In case you don't want to use a local nodejs engine, a Dockerfile is included that runs the application inside a container.

Build the image:

```
docker build -t everactive-api .
```

Run the application.

Edge Platform Example:
```
docker run -ti --rm everactive-api npm run api-client
```


MVM Example:
```
docker run -ti --rm everactive-api npm run mvm-client
```

## Documentation

* Platform API https://docs.api.everactive.com
* MVM API https://api-spec.data.everactive.com/everactive-api.html#tag/Machine
