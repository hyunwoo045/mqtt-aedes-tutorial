// MQTT subscriber
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");
const topic = "test";

client.on("message", (topic, message) => {
  message = message.toString();
  console.log("Subscriber: ", message);
});

client.on("connect", () => {
  client.subscribe(topic);
});
