const axios = require("axios");
const fs = require("fs");
const dtls = require("node-dtls");

const serverKey = fs.readFileSync(
  path.join(__dirname, "tls", "server-key.pem")
);
const serverCert = fs.readFileSync(
  path.join(__dirname, "tls", "server-cert.pem")
);
const caCert = fs.readFileSync(path.join(__dirname, "tls", "ca-cert.pem"));

const influxDBURL =
  "http://localhost:8086/api/v2/write?org=ferman&bucket=coapdb&precision=s";
const influxDBToken =
  "qlHlljmPUr_db95TBbB-i5iN001F89tzn8kYgLlrnMVRPmAQh6qa0Z7szIyOXhIxYnAGG9opv0-CG5y__IqFcw==";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const portNumber = 5684; // DTLS port

const dtlsServer = dtls.createServer({
  type: "udp4",
  key: serverKey,
  cert: serverCert,
  ca: caCert,
});

dtlsServer.bind(portNumber);
dtlsServer.on("secureConnection", async (cleartextStream) => {
  const coapServer = coap.createServer();

  coapServer.on("request", (req, res) => {
    console.info("CoAP device got a request from %s", req.url);

    if (req.method !== "GET") {
      res.code = "4.05";
      return res.end();
    }

    if (
      req.options.accept &&
      req.options.accept[0].value !== "application/json"
    ) {
      res.code = "4.06";
      return res.end();
    }

    switch (req.url) {
      case "/co2":
        const co2Value = randomInt(0, 1000);
        writeToInflux("co2", co2Value);
        displayOutput(res, { Co2: co2Value });
        break;
      case "/temperature":
        const temperatureValue = randomInt(-10, 50);
        writeToInflux("temperature", temperatureValue);
        displayOutput(res, { Temperature: temperatureValue });
        break;
      case "/humidity":
        const humidityValue = randomInt(0, 100);
        writeToInflux("humidity", humidityValue);
        displayOutput(res, { Humidity: humidityValue });
        break;
      default:
        displayOutput(res, { error: "Not Found" });
    }
  });

  coapServer.listen();
});
console.log("CoAP Server is started at port Number", portNumber);

function displayOutput(res, content) {
  if (content) {
    res.setOption("Content-Format", "application/json");
    res.code = "2.05";
    res.end(JSON.stringify(content));
  } else {
    res.code = "4.04";
    res.end();
  }
}

function writeToInflux(measurement, value) {
  const dataPoint = `${measurement} value=${value}`;
  axios
    .post(influxDBURL, dataPoint, {
      headers: {
        Authorization: `Token ${influxDBToken}`,
      },
    })
    .then((response) => {
      if (response.status === 204) {
        console.log(`Data written to InfluxDB: ${measurement} - ${value}`);
      } else {
        console.error("Error writing to InfluxDB: Unexpected response status");
      }
    })
    .catch((error) => {
      console.error(`Error writing to InfluxDB: ${error.message}`);
    });
}
