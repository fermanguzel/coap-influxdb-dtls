# CoAP to InfluxDB with DTLS

This project provides a solution to bridge data from CoAP (Constrained Application Protocol) endpoints to InfluxDB using DTLS (Datagram Transport Layer Security). It allows you to securely collect and store data from IoT devices that communicate over CoAP protocols into your InfluxDB database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

CoAP is a lightweight IoT communication protocol, and InfluxDB is a popular time-series database. This project bridges the gap between CoAP and InfluxDB, allowing you to collect, store, and analyze data from your IoT devices seamlessly.

## Features

- **CoAP to InfluxDB**: Collect data from CoAP endpoints and store it in InfluxDB.
- **DTLS Security**: Secure communication using Datagram Transport Layer Security.
- **Customizable Configuration**: Easily configure the bridge to match your specific needs.

## Getting Started

### Prerequisites

Before using this project, you should have the following prerequisites:

- CoAP devices you want to collect data from.
- An InfluxDB instance to store the data.
- Knowledge of your InfluxDB database setup (URL, database name, credentials, etc.).
- OpenSSL or other DTLS library for secure communication.

### Installation

1. Clone this repository:

   ```shell
   git clone https://github.com/fermanguzel/coap-influxdb-dtls.git
   ```

2. Build the project:

   ```shell
   cd coap-influxdb-dtls
   ```

## Usage

To use this project, follow these steps:

1. Configure the `coap-influxdb-dtls.toml` file with your specific settings. You can find an example configuration in the `example-config` directory.

2. Run the bridge:

   ```shell
   ./coap-influxdb-dtls -config /path/to/your/coap-influxdb-dtls.toml
   ```

3. The bridge will start listening for CoAP messages and sending data to InfluxDB.

## Contributing

We welcome contributions to this project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
