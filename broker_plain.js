const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = 1883;

server.listen(port, () => {
  console.log("Server started and listening on port", port);
});

aedes.on("client", function (client) {
  console.log(`Client Connected: ${client.id} to ${aedes.id}`);
});

aedes.on("subscribe", function (subscriptions, client) {
  const newTopic = subscriptions[subscriptions.length - 1].topic;
  console.log(`New Subscription! - "${newTopic}" by "${client.id}"`);
});

aedes.on("publish", (packet) => {
  console.log(packet.payload.toString());
});
