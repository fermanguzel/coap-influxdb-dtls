# CoAP Server with InfluxDB Integration

This is a simple CoAP (Constrained Application Protocol) server implemented in Node.js. The server responds to CoAP GET requests with random sensor data (CO2, Temperature, and Humidity) and sends this data to an InfluxDB database for storage. This README will guide you through setting up and using the CoAP server.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org/).
- InfluxDB: Make sure you have InfluxDB set up and running. You should also have an InfluxDB token ready for writing data.

## Installation

```bash
git clone https://github.com/fermanguzel/coap-influxdb-tls
```

1. Install the required Node.js packages using npm.

```bash
npm install
```

## Configuration

Before you can start using the CoAP server, you need to configure some settings in the **"coap.js"** file:

- **"influxDBURL"**: Set the URL of your InfluxDB server with the appropriate organization and bucket.

- **"influxDBToken"**: Replace it with your InfluxDB authorization token.

## Usage

To start the CoAP server, open your terminal and run the following command:

```bash
node coap.js
```

The CoAP server will start on port 5683.

## Making CoAP Requests

You can make CoAP GET requests to the server using a CoAP client or a tool like **coap-cli**. Here's an example using **coap-cli**

```bash
coap get coap://localhost:5683/co2
```

Replace **"/co2"** with **"/temperature"** or **"/humidity"** to get other sensor data.

## Data Storage

The server sends the received data to the InfluxDB database. You can access and query this data using InfluxDB's tools.

## License

This CoAP server is open-source and available under the [MIT License](https://github.com/fermanguzel/coap-influxdb/blob/main/LICENSE).

## Authors

### FERMAN GÜZEL

Feel free to contribute and improve this project! If you have any questions or encounter issues, please open an issue in the repository.

Happy CoAP-ing!
